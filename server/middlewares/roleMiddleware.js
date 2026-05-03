export function allowRoles(...roles) {
  return function roleMiddleware(req, res, next) {
    if (!req.account) {
      return res.status(401).json({ message: "Usuario nao autenticado." });
    }

    if (!roles.includes(req.account.role)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    next();
  };
}

export function allowSelfOrRoles(...roles) {
  return function selfOrRoleMiddleware(req, res, next) {
    if (!req.account) {
      return res.status(401).json({ message: "Usuario nao autenticado." });
    }

    const isSelf = req.account.id === req.params.id;
    const hasRole = roles.includes(req.account.role);

    if (!isSelf && !hasRole) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    next();
  };
}
