import express, { Router } from "express";
import * as selecaoController from "../../controllers/selecaoController.js";

const selecoesV3: Router = Router();

selecoesV3.get("/", selecaoController.listarTodas);
selecoesV3.get("/:id", selecaoController.buscarPorId);
selecoesV3.post("/", selecaoController.criar);
selecoesV3.put("/:id", selecaoController.atualizar);
selecoesV3.delete("/:id", selecaoController.deletar);

export default selecoesV3;
