/**
 * Controller de Jogadores
 * Gerencia operações HTTP para jogadores da Copa 2022
 * @module controllers/jogadorController
 */
import { Request, Response } from "express";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";
import jogadorService from "../services/jogadorService.js";
import { NotFoundError } from "../errors/NotFoundError.js";

/**
 * Listar todos os jogadores
 * @async
 * @function listarTodos
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Lista de jogadores
 * @throws {Error} 500 - Erro ao listar jogadores
 * @example
 * // GET v3/jogadores
 * Response 200: [{ id: 1, nome: "Neymar", posicao: "Atacante", numeroCamisa: 10, selecaoId: 1 }]
 */
export const listarTodos = async (req: Request, res: Response) => {
  try {
    const jogadores = await jogadorService.listarTodos();

    res.status(200).json(jogadores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar jogadores" });
  }
};

/**
 * Busca um jogador pelo ID
 * @async
 * @function buscarPorId
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Jogador encontrado
 * @throws {NotFoundError} 404 - Jogador não encontrado
 * @throws {Error} 500 - Erro ao buscar jogador
 * @example
 * // GET v3/jogadores/1
 * Response 200: { id: 1, nome: "Neymar", posicao: "Atacante", numeroCamisa: 10, selecaoId: 1 }
 */
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

/**
 * Cria um novo jogador
 * @async
 * @function criar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 201 - Jogador criado
 * @throws {Error} 500 - Erro ao criar jogador
 * @example
 * // POST v3/jogadores
 * Request body: { nome: "Neymar", posicao: "Atacante", numeroCamisa: 10, selecaoId: 1 }
 * Response 201: { id: 1, nome: "Neymar", posicao: "Atacante", numeroCamisa: 10, selecaoId: 1 }
 */
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

/**
 * Atualiza um jogador existente
 * @async
 * @function atualizar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Jogador atualizado
 * @throws {NotFoundError} 404 - Jogador não encontrado
 * @throws {Error} 500 - Erro ao atualizar jogador
 */
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

/** * Deleta um jogador pelo ID
 * @async
 * @function deletar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Jogador deletado
 * @throws {NotFoundError} 404 - Jogador não encontrado
 * @throws {Error} 500 - Erro ao deletar jogador
 */
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
