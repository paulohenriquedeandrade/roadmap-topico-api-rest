import express from 'express';
import { logger } from './middleware/logger.js';
import { validarSelecoes } from './middleware/validarSelecoes.js';
import { tratarErros } from './middleware/tratarErros.js';

const app = express();

app.use(express.json());
app.use(logger);

// Mock de dados para seleções
const selecoes = [
    { id: 1, nome: "Brasil", grupo: "G" },
    { id: 2, nome: "Suiça", grupo: "G" },
    { id: 3, nome: "Sérvia", grupo: "G" },
    { id: 4, nome: "Camarões", grupo: "G" }
]

app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

app.get("/selecoes", (req, res) => {
    res.status(200).send(selecoes);
});

app.post("/selecoes", validarSelecoes, (req, res) => {
    selecoes.push(req.body);
    res.status(201).send("Seleção adicionada com sucesso!");
});

app.get("/erro", (req, res) => {
    throw new Error("Erro proposital para teste.");
});

app.use(tratarErros);

export default app;
