import dotenv from "dotenv";
import { closeDatabase, connectDatabase, dbRun } from "./config/database.js";
import {
  seedAdmins,
  seedBrokers,
  seedPassword,
  seedSuperUsers,
  seedUsers,
} from "./data/seedAccounts.js";
import { seedProperties } from "./data/seedProperties.js";
import { Admin, Broker, Property, SuperUser, User } from "./models/index.js";
import { buildAccountPayload } from "./utils/password.js";

dotenv.config();

try {
  await connectDatabase();
  await dbRun("TRUNCATE TABLE properties, users, brokers, admins, super_users RESTART IDENTITY");

  const superUsers = await Promise.all(
    seedSuperUsers.map((account) =>
      SuperUser.create(buildAccountPayload({ ...account, password: seedPassword }))
    )
  );
  const admins = await Promise.all(
    seedAdmins.map((account) => Admin.create(buildAccountPayload({ ...account, password: seedPassword })))
  );
  const brokers = await Promise.all(
    seedBrokers.map((account) => Broker.create(buildAccountPayload({ ...account, password: seedPassword })))
  );
  const users = await Promise.all(
    seedUsers.map((account) => User.create(buildAccountPayload({ ...account, password: seedPassword })))
  );

  const properties = seedProperties.map((property, index) => ({
    ...property,
    broker: brokers[index % brokers.length].id,
    createdBy: {
      id: admins[index % admins.length].id,
      model: "Admin",
    },
  }));

  await Property.insertMany(properties);

  console.log(`${superUsers.length} super admins cadastrados.`);
  console.log(`${admins.length} admins cadastrados.`);
  console.log(`${brokers.length} corretores cadastrados.`);
  console.log(`${users.length} usuarios cadastrados.`);
  console.log(`${seedProperties.length} imoveis cadastrados.`);
  console.log(`Senha padrao das contas de seed: ${seedPassword}`);
} catch (error) {
  console.error("Falha ao popular banco:", error.message);
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
