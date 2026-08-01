/**
 * Port VERBATIM dari kontrol keamanan SSR Angular:
 *   packages/platform-server/src/url.ts        -> resolveUrl / isSafeOriginChange
 *   packages/platform-server/src/utils.ts:382  -> validateAllowedHosts / isHostAllowed
 *
 * Satu-satunya perubahan: `RuntimeError` diganti Error biasa yang MEMBAWA kode,
 * supaya jenis penolakan bisa dibedakan saat fuzzing. Struktur cabang tidak diubah.
 *
 * Kesetiaan port diverifikasi oleh `fidelity.mjs` terhadap ekspektasi spec asli
 * (packages/platform-server/test/utils_spec.ts).
 */

export class NgError extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
  }
}

// --- url.ts ---------------------------------------------------------------

const HTTP_OR_HTTPS_PROTOCOL_REGEX = /^https?:/i;

export function resolveUrl(urlStr, origin, options = {}) {
  const originUrl = typeof origin === 'string' ? new URL('/', origin) : origin;

  if (!urlStr) {
    return originUrl || null;
  }

  urlStr = urlStr.trim();

  let resolved;
  try {
    resolved = new URL(urlStr);
  } catch {}
  const {allowProtocolRelative = false, allowOriginChange = true} = options;

  if (resolved) {
    if (originUrl && !isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) {
      throwSuspiciousUrlError(urlStr);
    }
    return resolved;
  }

  if (!URL.canParse(urlStr, 'http://fake')) {
    throw new NgError('INVALID_URL', `Invalid URL: ${urlStr}`);
  }

  if (!originUrl) {
    return null;
  }

  if (urlStr.startsWith('//')) {
    if (!allowProtocolRelative) {
      throw new NgError(
        'PROTOCOL_RELATIVE_URL_NOT_ALLOWED',
        `Protocol relative URLs are not allowed in this context. URL: ${urlStr}`,
      );
    }
    return new URL(urlStr, origin);
  }

  resolved = new URL(urlStr, origin);

  if (!isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) {
    throwSuspiciousUrlError(urlStr);
  }

  return resolved;
}

function throwSuspiciousUrlError(urlStr) {
  throw new NgError(
    'SUSPICIOUS_URL_CHANGE_ORIGIN',
    `URL ${urlStr} changed origin unexpectedly. This is suspicious and may indicate a security bypass attempt.`,
  );
}

function isSafeOriginChange(resolved, origin, urlStr, allowOriginChange) {
  if (origin.origin === resolved.origin) {
    return true;
  }
  if (!allowOriginChange) {
    return false;
  }
  return HTTP_OR_HTTPS_PROTOCOL_REGEX.test(urlStr);
}

// --- utils.ts -------------------------------------------------------------

export function validateAllowedHosts(url, allowedHosts) {
  if (typeof url === 'string') {
    const parsedUrl = resolveUrl(url);
    if (parsedUrl !== null) {
      const hostname = parsedUrl.hostname;
      const allowedHostsSet = new Set(allowedHosts);
      if (!isHostAllowed(hostname, allowedHostsSet)) {
        throw new NgError('HOST_NOT_ALLOWED', `Host ${url} is not allowed.`);
      }
    }
  }
}

export function isHostAllowed(hostname, allowedHosts) {
  if (allowedHosts.has('*') || allowedHosts.has(hostname)) {
    return true;
  }

  for (const allowedHost of allowedHosts) {
    if (!allowedHost.startsWith('*.')) {
      continue;
    }
    const domain = allowedHost.slice(1);
    if (hostname.endsWith(domain)) {
      return true;
    }
  }

  return false;
}
