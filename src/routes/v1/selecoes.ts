import express, { Router } from "express";
import { validarSelecoes } from "../../middleware/validarSelecoes.js";

const selecoesV1: Router = Router();

// Mock de dados para seleções
const selecoes = [
  { id: 1, nome: "Brasil", grupo: "G" },
  { id: 2, nome: "Suiça", grupo: "G" },
  { id: 3, nome: "Sérvia", grupo: "G" },
  { id: 4, nome: "Camarões", grupo: "G" },
];

/**
 * @swagger
 * /v1/selecoes:
 *   get:
 *    summary: Retorna a lista de seleções.
 *    tags: [Seleções]
 *    responses:
 *      200:
 *        description: Lista de seleções retornada com sucesso.
 */
selecoesV1.get("/", (req, res) => {
  res.status(200).send(selecoes);
});

/**
 * @swagger
 * /v1/selecoes:
 *  post:
 *    summary: Adiciona uma nova seleção.
 *    tags: [Seleções]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              selecao:
 *                type: string
 *                example: "Brasil"
 *              grupo:
 *                type: string
 *                example: "G"
 *    responses:
 *      201:
 *        description: Seleção adicionada com sucesso.
 *      400:
 *       description: Requisição inválida.
 */
selecoesV1.post("/", validarSelecoes, (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção adicionada com sucesso!");
});

export default selecoesV1;
