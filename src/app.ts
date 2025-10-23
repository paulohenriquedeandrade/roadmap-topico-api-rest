import express, { Application } from "express";
import { logger } from "./middleware/logger.js";
import { validarSelecoes } from "./middleware/validarSelecoes.js";
import { tratarErros } from "./middleware/tratarErros.js";
import { specs } from "./swagger/swagger.js";
import swaggerUi from "swagger-ui-express";
import selecoesV1 from "./routes/v1/selecoes.js";
import selecoesV2 from "./routes/v2/selecoes.js";
import selecoesV3 from "./routes/v3/selecoes.js";
import jogadoresV3 from "./routes/v3/jogadores.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/v1/selecoes", selecoesV1);
app.use("/v2/selecoes", selecoesV2);
app.use("/v3/selecoes", selecoesV3);
app.use("/v3/jogadores", jogadoresV3);

app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

app.get("/erro", (req, res) => {
  throw new Error("Erro proposital para teste.");
});

app.use(tratarErros);

export default app;
