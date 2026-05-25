import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./config/database.js";

import accountRoutes from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import brokerRoutes from "./routes/brokerRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const clientUrls = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || clientUrls.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origem nao permitida pelo CORS: ${origin}`));
    },
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/users", userRoutes);
app.use("/api/brokers", brokerRoutes);

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "imobiliaria-api",
    routes: ["/api/health", "/api/properties"],
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "imobiliaria-api" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "imobiliaria-api" });
});

app.use("/api/properties", propertyRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Rota nao encontrada: ${req.method} ${req.path}` });
});

app.use((error, req, res, _next) => {
  const isCorsError =
    typeof error?.message === "string" &&
    error.message.startsWith("Origem nao permitida pelo CORS:");
  const statusCode = isCorsError
    ? 403
    : error.name === "ValidationError"
      ? 400
      : 500;

  console.error(
    "Erro na API",
    {
      method: req.method,
      path: req.originalUrl,
      statusCode,
      message: error.message,
      name: error.name,
      code: error.code,
      context: error.context,
    },
    error.stack,
  );

  res.status(statusCode).json({
    message:
      statusCode === 400 || isCorsError
        ? error.message
        : "Erro interno do servidor.",
  });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao conectar no PostgreSQL:", error.message);
    process.exit(1);
  });
