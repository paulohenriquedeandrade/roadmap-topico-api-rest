/**
 * Service de Seleções
 * Contém a lógica de negócio para gerenciar seleções da Copa 2022
 * @module services/selecaoService
 */
import selecaoRepository from "../repositories/selecaoRepository.js";
import {
  CreateSelecao,
  Selecao,
  UpdateSelecao,
} from "../types/selecao.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class SelecaoService {
  /**
   * @async
   * @function listarTodas
   * @returns {Promise<Selecao[]>} Array com todas as seleções
   */
  async listarTodas() {
    return await selecaoRepository.findAll();
  }

  /**
   * @async
   * @function buscarPorId
   * @param {number} id - ID da seleção
   * @returns {Promise<Selecao>} Seleção encontrada
   * @throws {NotFoundError} Seleção não encontrada
   */
  async buscarPorId(id: number) {
    const selecao = await selecaoRepository.findById(id);

    if (!selecao) {
      throw new NotFoundError("Seleção não encontrada");
    }

    return selecao;
  }

  /**
   * @async
   * @function criar
   * @param {CreateSelecao} data - Dados da nova seleção
   * @returns {Promise<Selecao>} Seleção criada
   */
  async criar(data: CreateSelecao) {
    return await selecaoRepository.create(data);
  }

  /**
   * @async
   * @function atualizar
   * @param {number} id - ID da seleção a ser atualizada
   * @param {UpdateSelecao} data - Dados para atualização
   * @returns {Promise<Selecao>} Seleção atualizada
   * @throws {NotFoundError} Seleção não encontrada
   */
  async atualizar(id: number, data: UpdateSelecao) {
    await this.buscarPorId(id);

    return await selecaoRepository.update(id, data);
  }

  /**
   * @async
   * @function deletar
   * @param {number} id - ID da seleção a ser deletada
   * @returns {Promise<void>}
   * @throws {NotFoundError} Seleção não encontrada
   */
  async deletar(id: number) {
    await this.buscarPorId(id);

    return await selecaoRepository.delete(id);
  }
}

export default new SelecaoService();
