/**
 * Repositório para operações CRUD na entidade "Jogador".
 * Utiliza o Prisma Client para interagir com o banco de dados.
 * Fornece métodos para criar, ler, atualizar e deletar jogadores.
 * @module repositories/jogadorRepository
 */
import { prisma } from "../config/database.js";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";

class JogadorRepository {
  /**
   * @async
   * @function findAll
   * @returns {Promise<Jogador[]>} Array com todos os jogadores
   */
  async findAll() {
    return prisma.jogador.findMany({
      include: { selecao: true },
    });
  }

  /**
   * @async
   * @function findById
   * @param {number} id - ID do jogador
   * @returns {Promise<Jogador | null>} Jogador encontrado ou null se não existir
   */
  async findById(id: number) {
    return prisma.jogador.findUnique({
      where: { id },
      include: { selecao: true },
    });
  }

  /**
   * @async
   * @function create
   * @param {CreateJogador} data - Dados do novo jogador
   * @returns {Promise<Jogador>} Jogador criado
   */
  async create(data: CreateJogador) {
    return prisma.jogador.create({
      data,
    });
  }

  /**
   * @async
   * @function update
   * @param {number} id - ID do jogador a ser atualizado
   * @param {UpdateJogador} data - Dados para atualização
   * @returns {Promise<Jogador>} Jogador atualizado
   */
  async update(id: number, data: UpdateJogador) {
    return prisma.jogador.update({
      where: { id },
      data,
    });
  }

  /**
   * @async
   * @function delete
   * @param {number} id - ID do jogador a ser deletado
   * @returns {Promise<Jogador>} Jogador deletado
   */
  async delete(id: number) {
    return prisma.jogador.delete({
      where: { id },
    });
  }
}

export default new JogadorRepository();
