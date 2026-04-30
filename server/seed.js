import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { seedProperties } from "./data/seedProperties.js";
import { Property } from "./models/Property.js";

dotenv.config();

try {
  await connectDatabase();
  await Property.deleteMany({});
  await Property.insertMany(seedProperties);
  console.log(`${seedProperties.length} imoveis cadastrados.`);
} catch (error) {
  console.error("Falha ao popular banco:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.connection.close();
}
