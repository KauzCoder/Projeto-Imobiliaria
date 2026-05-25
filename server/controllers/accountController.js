import {
  createAccount,
  deleteAccount,
  getAccount,
  listAccountTypes,
  listAccounts,
  updateAccount,
} from "../services/accountService.js";

export function listAccountTypes(_req, res) {
  res.json(listAccountTypes());
}

export async function listAccounts(req, res, next) {
  try {
    const accounts = await listAccounts(req.params.accountType);
    res.json(accounts);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function getAccount(req, res, next) {
  try {
    const account = await getAccount(req.params.accountType, req.params.id);
    res.json(account);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function createAccount(req, res, next) {
  try {
    const account = await createAccount(req.params.accountType, req.body);
    res.status(201).json(account);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  try {
    const account = await updateAccount(
      req.params.accountType,
      req.params.id,
      req.body,
    );
    res.json(account);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteAccount(req, res, next) {
  try {
    await deleteAccount(req.params.accountType, req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}
