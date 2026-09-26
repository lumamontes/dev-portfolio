export type BasicCredentials = {
  username: string;
  password: string;
};

const encoder = new TextEncoder();

function base64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function signature(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(
    new Uint8Array(
      await crypto.subtle.sign("HMAC", key, encoder.encode(payload)),
    ),
  );
}

export function parseBasicCredentials(
  header: string | null,
): BasicCredentials | null {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export async function createSessionToken(
  secret: string,
  now = Date.now(),
  ttlMs = 15 * 60 * 1000,
) {
  const payload = `${now + ttlMs}`;
  return `${base64Url(encoder.encode(payload))}.${await signature(secret, payload)}`;
}

export async function isValidSessionToken(
  token: string | null,
  secret: string,
  now = Date.now(),
) {
  if (!token) return false;
  const [encodedExpiry, providedSignature] = token.split(".");
  if (!encodedExpiry || !providedSignature) return false;
  try {
    const expiry = Number(
      new TextDecoder().decode(fromBase64Url(encodedExpiry)),
    );
    if (!Number.isFinite(expiry) || expiry <= now) return false;
    const expectedSignature = await signature(secret, String(expiry));
    return expectedSignature === providedSignature;
  } catch {
    return false;
  }
}

export function sessionCookie(token: string) {
  return `publish_session=${token}; Max-Age=900; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

export function sessionFromCookie(cookie: string | null) {
  return (
    cookie
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("publish_session="))
      ?.slice("publish_session=".length) ?? null
  );
}
