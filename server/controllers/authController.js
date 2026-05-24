import { Admin, Broker, SuperUser, User } from "../models/index.js";
import { buildAccountPayload, verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

const authModels = {
  admin: Admin,
  corretor: Broker,
  super_user: SuperUser,
  usuario: User,
};

async function findAccountByEmail(email) {
  for (const Model of Object.values(authModels)) {
    const account = await Model.findByEmail(email);

    if (account) {
      return { account, Model };
    }
  }

  return null;
}

export async function register(req, res, next) {
  try {
    const { role = "usuario" } = req.body;
    const Model = authModels[role];

    if (!Model) {
      return res.status(400).json({ message: "Tipo de conta invalido." });
    }

    const existingAccount = await findAccountByEmail(req.body.email);

    if (existingAccount) {
      return res.status(409).json({ message: "Email ja cadastrado." });
    }

    const account = await Model.create(buildAccountPayload(req.body));
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha sao obrigatorios." });
    }

    const result = await findAccountByEmail(email);
    const account = result?.account;

    if (!account || !verifyPassword(password, account.passwordHash)) {
      return res.status(401).json({ message: "Credenciais invalidas." });
    }

    if (!account.active) {
      return res.status(403).json({ message: "Conta desativada." });
    }

    await result.Model.updateLastLogin(account.id);

    const safeAccount = { ...account };
    delete safeAccount.passwordHash;

    const token = generateToken(account);

    res.json({
      account: safeAccount,
      token,
    });
  } catch (error) {
    next(error);
  }
}
