import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./config/database.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "imobiliaria-api" });
});

app.use("/api/properties", propertyRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Rota nao encontrada: ${req.method} ${req.path}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error.name === "ValidationError" ? 400 : 500;
  res.status(statusCode).json({
    message: statusCode === 400 ? error.message : "Erro interno do servidor.",
  });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao conectar no MongoDB:", error.message);
    process.exit(1);
  });
