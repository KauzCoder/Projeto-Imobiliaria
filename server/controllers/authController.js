import { loginAccount, registerAccount } from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const { role = "usuario" } = req.body;
    const account = await registerAccount({ role, data: req.body });
    res.status(201).json(account);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    error.context = {
      ...error.context,
      stage: "register",
      role: req.body?.role,
      email: req.body?.email?.trim().toLowerCase(),
    };
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const session = await loginAccount(req.body);
    res.json(session);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    error.context = {
      ...error.context,
      stage: "login",
      email: req.body?.email?.trim().toLowerCase(),
    };
    next(error);
  }
}
