# Gerbang `allowedHosts` SSR — hasil NEGATIF (tidak ada bypass)

Area ini disasar karena spec Angular sendiri menyebutnya kontrol keamanan:
`packages/platform-server/test/utils_spec.ts` punya kasus berjudul
**"should throw an error for malformed absolute URLs (SSRF bypass attempt)"**.
Kalau tim Angular menganggap ini batas keamanan, ia layak diserang.

## Yang diperiksa

`validateAllowedHosts` (`packages/platform-server/src/utils.ts:382`) memanggil
`resolveUrl(url)` **tanpa origin**. Pada jalur satu-argumen
(`packages/platform-server/src/url.ts:89-91`), setiap string yang gagal
`new URL(s)` tetapi lolos `URL.canParse(s, 'http://fake')` akan `return null`
— dan `validateAllowedHosts` melewatkan pengecekan host **seluruhnya**.

Hipotesisnya: string seperti itu bisa berubah menjadi URL lintas-origin di
hilir, karena konsumen memanggil `resolveUrl` lagi **dengan** origin:

| konsumen | pemanggilan |
|---|---|
| `server.ts:107` | `resolveUrl(config.url, 'http://localhost').href` → basis dokumen domino |
| `location.ts:45` | `resolveUrl(config.url, doc.location.origin)` → `ServerPlatformLocation.hostname`, yang dipakai `http.ts:88` untuk membangun prefix permintaan HttpClient sisi server (sink SSRF) |

## Berkas

- `port.mjs` — port verbatim `resolveUrl` / `isSafeOriginChange` /
  `validateAllowedHosts` / `isHostAllowed`. Satu-satunya perubahan:
  `RuntimeError` → `Error` pembawa kode, supaya jenis penolakan bisa dibedakan.
- `fidelity.mjs` — **kontrol kesetiaan**: menjalankan ulang ekspektasi
  `utils_spec.ts` terhadap port. **14/14 lulus.** Tanpa ini, hasil fuzzing
  tidak boleh dipercaya.
- `fuzz-bypass.mjs` — fuzz diferensial gerbang vs hostname efektif.

## Cara menjalankan

```
node analysis/tools/ssr-host/fidelity.mjs      # harus 14/14
node analysis/tools/ssr-host/fuzz-bypass.mjs
```

## Hasil

```
kandidat = 10296
String yang MELEWATI gerbang tanpa dicek sama sekali: 3966
TIDAK ADA BYPASS.
```

**3966 string memang melewati gerbang tanpa diperiksa** — tapi tidak satu pun
berakhir di host lain. Pertahanan berlapisnya menutup:

- `//evil.com` → hilir melempar `PROTOCOL_RELATIVE_URL_NOT_ALLOWED`
  (`allowProtocolRelative` default `false`).
- `\\evil.com`, `/\evil.com` → lolos cek `startsWith('//')` (backslash), tapi
  `isSafeOriginChange` menolak karena `/^https?:/i` gagal pada string mentahnya.
- String yang `^https?:` lolos selalu berhasil di `new URL(s)` berdiri sendiri,
  sehingga gerbang MEMANG memeriksanya — tidak ada saluran divergensi.

## Kesimpulan yang jujur

Satu-satunya saluran divergensi adalah `return null`, dan setiap konsumen
memvalidasi ulang. Kelemahan yang tersisa bersifat struktural, bukan cacat yang
bisa dieksploitasi: gerbangnya **fail-open** untuk masukan yang tidak bisa
diurai berdiri sendiri, dan keamanannya bergantung pada konsumen hilir yang
kebetulan ketat. Itu catatan desain, bukan temuan — jadi tidak dilaporkan.

Nilai berkas ini: mengubah "belum diperiksa" menjadi "diperiksa, bersih",
dengan alat yang bisa dijalankan ulang saat `url.ts` berubah.
