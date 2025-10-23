import express, { Router } from "express";
import * as jogadorController from "../../controllers/jogadorController.js";

const jogadoresV3: Router = Router();

jogadoresV3.get("/", jogadorController.listarTodos);
jogadoresV3.get("/:id", jogadorController.buscarPorId);
jogadoresV3.post("/", jogadorController.criar);
jogadoresV3.put("/:id", jogadorController.atualizar);
jogadoresV3.delete("/:id", jogadorController.deletar);

export default jogadoresV3;
