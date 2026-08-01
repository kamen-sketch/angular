/**
 * Lingkungan ServiceWorkerGlobalScope minimal untuk menjalankan `ngsw-worker.js`
 * yang SEBENARNYA dikirim npm, di dalam Node.
 *
 * Hanya permukaan yang benar-benar dipakai bundel yang diimplementasikan:
 *   caches.open/keys/delete/has/match, cache.match/put/keys/delete/name,
 *   registration.scope, addEventListener, clients, fetch, skipWaiting.
 *
 * Sengaja TIDAK memakai kerangka uji Angular: seluruh keputusan pencocokan,
 * caching, dan penyajian dilakukan oleh kode Angular yang dikirim, bukan oleh
 * berkas ini. Berkas ini cuma menyediakan penyimpanan dan jaringan.
 */
import {readFileSync} from 'fs';
import vm from 'vm';

class MockCache {
  constructor(name) {
    this.name = name;
    // kunci: url permintaan -> {req, res}
    this.entri = new Map();
  }
  #kunci(req, opsi = {}) {
    let u = typeof req === 'string' ? req : req.url;
    if (opsi.ignoreSearch) u = u.replace(/[?].*$/, '');
    return u;
  }
  async match(req, opsi) {
    if (opsi?.ignoreSearch) {
      const target = this.#kunci(req, opsi);
      for (const [k, v] of this.entri) {
        if (k.replace(/[?].*$/, '') === target) return v.res.clone();
      }
      return undefined;
    }
    const v = this.entri.get(this.#kunci(req));
    return v ? v.res.clone() : undefined;
  }
  async put(req, res) {
    this.entri.set(this.#kunci(req), {
      req: typeof req === 'string' ? new Request(req) : req,
      res,
    });
  }
  async delete(req, opsi) {
    return this.entri.delete(this.#kunci(req, opsi));
  }
  async keys() {
    return Array.from(this.entri.values()).map((v) => v.req);
  }
}

class MockCacheStorage {
  constructor() {
    this.caches = new Map();
  }
  async open(name) {
    if (!this.caches.has(name)) this.caches.set(name, new MockCache(name));
    return this.caches.get(name);
  }
  async keys() {
    return Array.from(this.caches.keys());
  }
  async has(name) {
    return this.caches.has(name);
  }
  async delete(name) {
    return this.caches.delete(name);
  }
  async match(req, opsi) {
    for (const c of this.caches.values()) {
      const r = await c.match(req, opsi);
      if (r) return r;
    }
    return undefined;
  }
}

class MockScope {
  constructor(scopeUrl, handlerFetch) {
    this.pesanKeDiriSendiri = [];
    this.registration = {
      scope: scopeUrl,
      // Driver mem-post 'INITIALIZE' ke worker aktif saat activate; di peramban
      // itu dirinya sendiri. Catat pesannya alih-alih membuangnya.
      active: {postMessage: (m) => this.pesanKeDiriSendiri.push(m)},
      unregister: async () => true,
      showNotification: async () => {},
    };
    this.caches = new MockCacheStorage();
    this.clients = {
      claim: async () => {},
      matchAll: async () => [],
      get: async () => undefined,
    };
    this.pendengar = new Map();
    this.handlerFetch = handlerFetch;
    this.logJaringan = [];
    this.self = this;
  }
  addEventListener(tipe, fn) {
    if (!this.pendengar.has(tipe)) this.pendengar.set(tipe, []);
    this.pendengar.get(tipe).push(fn);
  }
  removeEventListener(tipe, fn) {
    const a = this.pendengar.get(tipe) ?? [];
    const i = a.indexOf(fn);
    if (i >= 0) a.splice(i, 1);
  }
  async skipWaiting() {}
  async fetch(req) {
    const r = typeof req === 'string' ? new Request(req) : req;
    this.logJaringan.push(r.url);
    return this.handlerFetch(r);
  }

  /** Menyalakan event dan menunggu seluruh waitUntil/respondWith selesai. */
  async kirim(tipe, isi = {}) {
    const tunggu = [];
    let respons;
    const event = {
      type: tipe,
      ...isi,
      waitUntil: (p) => tunggu.push(p),
      respondWith: (p) => {
        respons = p;
        tunggu.push(p);
      },
    };
    for (const fn of this.pendengar.get(tipe) ?? []) fn(event);
    await Promise.all(tunggu.map((p) => Promise.resolve(p).catch(() => {})));
    return respons ? await respons : undefined;
  }
}

/** Memuat ngsw-worker.js apa adanya ke dalam scope tiruan. */
export function muatWorker(jalurWorker, scopeUrl, handlerFetch) {
  const scope = new MockScope(scopeUrl, handlerFetch);

  // Di peramban, URL relatif di dalam service worker di-resolve terhadap URL
  // worker itu. `Request` milik Node menolak URL relatif, jadi SW akan langsung
  // masuk SAFE_MODE saat mengambil `ngsw.json?ngsw-cache-bust=...`. Kita pulihkan
  // semantik peramban — dan HANYA itu; tidak ada perilaku lain yang diubah.
  class RequestRelatif extends Request {
    constructor(input, init) {
      if (typeof input === 'string' && !/^[a-z][a-z0-9+.-]*:/i.test(input)) {
        input = new URL(input, scopeUrl).href;
      }
      super(input, init);
    }
  }

  const konteks = vm.createContext({
    self: scope,
    Request: RequestRelatif,
    Response,
    Headers,
    URL,
    TextEncoder,
    TextDecoder,
    console,
    setTimeout,
    clearTimeout,
    Promise,
    Date,
    Math,
    JSON,
    Object,
    Array,
    Map,
    Set,
    Error,
    Uint8Array,
    ArrayBuffer,
    String,
    Number,
    Boolean,
    Symbol,
    RegExp,
    isNaN,
    parseInt,
    parseFloat,
    encodeURIComponent,
    decodeURIComponent,
  });
  konteks.globalThis = konteks;
  vm.runInContext(readFileSync(jalurWorker, 'utf8'), konteks, {filename: jalurWorker});
  return scope;
}
