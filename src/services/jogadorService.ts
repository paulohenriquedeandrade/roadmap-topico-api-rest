/**
 * Service de Jogadores
 * Contém a lógica de negócio para gerenciar jogadores da Copa 2022
 * @module services/jogadorService
 */
import jogadorRepository from "../repositories/jogadorRepository.js";
import {
  CreateJogador,
  Jogador,
  UpdateJogador,
} from "../types/jogador.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class JogadorService {
  /**
   * @async
   * @function listarTodos
   * @returns {Promise<Jogador[]>} Array de jogadores
   */
  async listarTodos() {
    return await jogadorRepository.findAll();
  }

  /**
   * @async
   * @function buscarPorId
   * @param {number} id - ID do jogador
   * @returns {Promise<Jogador>} Jogador encontrado
   * @throws {NotFoundError} Jogador não encontrado
   */
  async buscarPorId(id: number) {
    const jogador = await jogadorRepository.findById(id);

    if (!jogador) {
      throw new NotFoundError("Jogador não encontrado");
    }

    return jogador;
  }

  /**
   * @async
   * @function criar
   * @param {CreateJogador} data - Dados do novo jogador
   * @returns {Promise<Jogador>} Jogador criado
   */
  async criar(data: CreateJogador) {
    return await jogadorRepository.create(data);
  }

  /**
   * @async
   * @function atualizar
   * @param {number} id - ID do jogador a ser atualizado
   * @param {UpdateJogador} data - Dados para atualização
   * @returns {Promise<Jogador>} Jogador atualizado
   * @throws {NotFoundError} Jogador não encontrado
   */
  async atualizar(id: number, data: UpdateJogador) {
    await this.buscarPorId(id);

    return await jogadorRepository.update(id, data);
  }

  /**
   * @async
   * @function deletar
   * @param {number} id - ID do jogador a ser deletado
   * @returns {Promise<Jogador>} Jogador deletado
   * @throws {NotFoundError} Jogador não encontrado
   */
  async deletar(id: number) {
    await this.buscarPorId(id);

    return await jogadorRepository.delete(id);
  }
}

export default new JogadorService();
