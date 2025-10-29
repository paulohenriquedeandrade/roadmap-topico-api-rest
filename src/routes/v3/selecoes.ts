import express, { Router } from "express";
import * as selecaoController from "../../controllers/selecaoController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const selecoesV3: Router = Router();

selecoesV3.get("/", authMiddleware, selecaoController.listarTodas);
selecoesV3.get("/:id", authMiddleware, selecaoController.buscarPorId);
selecoesV3.post("/", authMiddleware, selecaoController.criar);
selecoesV3.put("/:id", authMiddleware, selecaoController.atualizar);
selecoesV3.delete("/:id", authMiddleware, selecaoController.deletar);

export default selecoesV3;
