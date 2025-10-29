import express, { Router } from "express";
import * as jogadorController from "../../controllers/jogadorController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const jogadoresV3: Router = Router();

jogadoresV3.get("/", authMiddleware, jogadorController.listarTodos);
jogadoresV3.get("/:id", authMiddleware, jogadorController.buscarPorId);
jogadoresV3.post("/", authMiddleware, jogadorController.criar);
jogadoresV3.put("/:id", authMiddleware, jogadorController.atualizar);
jogadoresV3.delete("/:id", authMiddleware, jogadorController.deletar);

export default jogadoresV3;
