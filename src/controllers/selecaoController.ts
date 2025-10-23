import { Request, Response } from "express";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";
import selecaoService from "../services/selecaoService.js";

export const listarTodas = async (req: Request, res: Response) => {
  try {
    const selecoes = await selecaoService.listarTodas();

    res.status(200).json(selecoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar seleções" });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selecao = await selecaoService.buscarPorId(Number(id));

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar seleção" });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { nome, grupo, titulos } = req.body as CreateSelecao;

    const selecao = await selecaoService.criar({
      nome,
      grupo,
      titulos,
    });

    res.status(201).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar seleção" });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, grupo, titulos } = req.body as UpdateSelecao;

    const selecao = await selecaoService.atualizar(Number(id), {
      nome,
      grupo,
      titulos,
    });

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar seleção" });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selecao = await selecaoService.deletar(Number(id));

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json({ message: "Seleção deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar seleção" });
  }
};
