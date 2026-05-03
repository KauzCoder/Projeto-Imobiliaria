import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const keyLength = 64;

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, keyLength).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password, passwordHash) {
  if (!password || !passwordHash) return false;

  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return false;

  const hashBuffer = Buffer.from(storedHash, "hex");
  const testHashBuffer = scryptSync(password, salt, keyLength);

  if (hashBuffer.length !== testHashBuffer.length) return false;

  return timingSafeEqual(hashBuffer, testHashBuffer);
}

export function buildAccountPayload(body) {
  const { password, passwordHash, ...payload } = body;

  if (password) {
    payload.passwordHash = hashPassword(password);
  } else if (passwordHash) {
    payload.passwordHash = passwordHash;
  }

  return payload;
}
