import {
  createAccount as createAccountService,
  deleteAccount as deleteAccountService,
  getAccount as getAccountService,
  listAccountTypes as listAccountTypesService,
  listAccounts as listAccountsService,
  updateAccount as updateAccountService,
} from "../services/accountService.js";

export function listAccountTypes(_req, res) {
  res.json(listAccountTypesService());
}

export async function listAccounts(req, res, next) {
  try {
    const accounts = await listAccountsService(req.params.accountType);
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
    const account = await getAccountService(req.params.accountType, req.params.id);
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
    const account = await createAccountService(req.params.accountType, req.body);
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
    const account = await updateAccountService(
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
    await deleteAccountService(req.params.accountType, req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
}
