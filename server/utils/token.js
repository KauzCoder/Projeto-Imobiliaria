import jwt from "jsonwebtoken";

const fallbackJwtSecret = "ninho-imoveis-local-secret";

function getJwtSecret() {
  return process.env.JWT_SECRET || fallbackJwtSecret;
}

export function generateToken(account) {
  return jwt.sign(
    { id: account._id, email: account.email, role: account.role },
    getJwtSecret(),
    { expiresIn: "7d" },
  );
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}
