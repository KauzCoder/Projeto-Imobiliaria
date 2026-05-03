import { verifyToken } from "../utils/token.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token de autenticacao ausente ou invalido." });
    }

    const token = authHeader.split(" ")[1];

     if (!token) {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  try {
    req.account = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token invalido." });
  }
}
