import dns from "dns";
import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI nao foi definida no ambiente.");
  }

  const dnsServers = process.env.DNS_SERVERS?.split(",").map((server) => server.trim()).filter(Boolean);
  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  } else if (mongoUri.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado");
}
