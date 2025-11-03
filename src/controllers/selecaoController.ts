/**
 * Controller de Seleções
 * Gerencia operações HTTP para seleções da Copa 2022
 * @module controllers/selecaoController
 */

import { Request, Response } from "express";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";
import selecaoService from "../services/selecaoService.js";
import { NotFoundError } from "../errors/NotFoundError.js";

/**
 * Lista todas seleções cadastradas
 * @async
 * @function listarTodas
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Lista de seleções
 * @throws {Error} 500 - Erro ao listar seleções
 * @example
 * // GET v3/selecoes
 * Response 200: [{ id: 1, nome: "Brasil", grupo: "G", titulos: 5 }]
 */
export const listarTodas = async (req: Request, res: Response) => {
  try {
    const selecoes = await selecaoService.listarTodas();

    res.status(200).json(selecoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar seleções" });
  }
};

/**
 * Busca uma seleção pelo ID
 * @async
 * @function buscarPorId
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Seleção encontrada
 * @throws {NotFoundError} 404 - Seleção não encontrada
 * @throws {Error} 500 - Erro ao buscar seleção
 * @example
 * // GET v3/selecoes/1
 * Response 200: { id: 1, nome: "Brasil", grupo: "G", titulos: 5 }
 */
export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selecao = await selecaoService.buscarPorId(Number(id));

    res.status(200).json(selecao);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao buscar seleção" });
  }
};

/**
 * Cria uma nova seleção
 * @async
 * @function criar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 201 - Seleção criada
 * @throws {Error} 500 - Erro ao criar seleção
 * @example
 * // POST v3/selecoes
 * Request body: { nome: "Brasil", grupo: "G", titulos: 5 }
 * Response 201: { id: 1, nome: "Brasil", grupo: "G", titulos: 5 }
 */
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

/**
 * Atualiza uma seleção existente
 * @async
 * @function atualizar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Seleção atualizada
 * @throws {NotFoundError} 404 - Seleção não encontrada
 * @throws {Error} 500 - Erro ao atualizar seleção
 */
export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, grupo, titulos } = req.body as UpdateSelecao;

    const selecao = await selecaoService.atualizar(Number(id), {
      nome,
      grupo,
      titulos,
    });

    res.status(200).json(selecao);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao atualizar seleção" });
  }
};

/**
 * Deleta uma seleção pelo ID
 * @async
 * @function deletar
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} 200 - Seleção deletada
 * @throws {NotFoundError} 404 - Seleção não encontrada
 * @throws {Error} 500 - Erro ao deletar seleção
 */
export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selecao = await selecaoService.deletar(Number(id));

    res.status(200).json({ message: "Seleção deletada com sucesso" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao deletar seleção" });
  }
};
