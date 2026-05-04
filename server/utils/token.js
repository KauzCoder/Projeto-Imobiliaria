import jwt from "jsonwebtoken";

export function generateToken(account) {
  return jwt.sign(
    { id: account._id, email: account.email, role: account.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
