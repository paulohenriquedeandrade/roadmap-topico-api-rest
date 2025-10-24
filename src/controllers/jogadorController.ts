import { Request, Response } from "express";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";
import jogadorService from "../services/jogadorService.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const listarTodos = async (req: Request, res: Response) => {
  try {
    const jogadores = await jogadorService.listarTodos();

    res.status(200).json(jogadores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar jogadores" });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jogador = await jogadorService.buscarPorId(Number(id));

    res.status(200).json(jogador);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao buscar jogador" });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { nome, posicao, numeroCamisa, selecaoId } =
      req.body as CreateJogador;

    const jogador = await jogadorService.criar({
      nome,
      posicao,
      numeroCamisa,
      selecaoId,
    });

    res.status(201).json(jogador);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar jogador" });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, posicao, numeroCamisa, selecaoId } =
      req.body as UpdateJogador;

    const jogador = await jogadorService.atualizar(Number(id), {
      nome,
      posicao,
      numeroCamisa,
      selecaoId,
    });

    res.status(200).json(jogador);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao atualizar jogador" });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const jogador = await jogadorService.deletar(Number(id));

    res.status(200).json(jogador);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao deletar jogador" });
  }
};
