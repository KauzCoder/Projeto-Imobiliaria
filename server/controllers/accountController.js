import { Admin, Broker, SuperUser, User } from "../models/index.js";
import { buildAccountPayload } from "../utils/password.js";

const accountModels = {
  admins: Admin,
  brokers: Broker,
  "super-users": SuperUser,
  users: User,
};

function getAccountModel(accountType) {
  return accountModels[accountType];
}

export function listAccountTypes(_req, res) {
  res.json(Object.keys(accountModels));
}

export async function listAccounts(req, res, next) {
  try {
    const Model = getAccountModel(req.params.accountType);

    if (!Model) {
      return res.status(404).json({ message: "Tipo de conta nao encontrado." });
    }

    const accounts = await Model.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function getAccount(req, res, next) {
  try {
    const Model = getAccountModel(req.params.accountType);

    if (!Model) {
      return res.status(404).json({ message: "Tipo de conta nao encontrado." });
    }

    const account = await Model.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Conta nao encontrada." });
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function createAccount(req, res, next) {
  try {
    const Model = getAccountModel(req.params.accountType);

    if (!Model) {
      return res.status(404).json({ message: "Tipo de conta nao encontrado." });
    }

    const account = await Model.create(buildAccountPayload(req.body));
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  try {
    const Model = getAccountModel(req.params.accountType);

    if (!Model) {
      return res.status(404).json({ message: "Tipo de conta nao encontrado." });
    }

    const account = await Model.findByIdAndUpdate(req.params.id, buildAccountPayload(req.body), {
      new: true,
      runValidators: true,
    });

    if (!account) {
      return res.status(404).json({ message: "Conta nao encontrada." });
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function deleteAccount(req, res, next) {
  try {
    const Model = getAccountModel(req.params.accountType);

    if (!Model) {
      return res.status(404).json({ message: "Tipo de conta nao encontrado." });
    }

    const account = await Model.findByIdAndDelete(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Conta nao encontrada." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
