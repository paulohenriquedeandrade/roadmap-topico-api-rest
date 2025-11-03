/**
 * Repositório para operações CRUD na entidade "Selecao".
 * Utiliza o Prisma Client para interagir com o banco de dados.
 * Fornece métodos para criar, ler, atualizar e deletar selecoes.
 * @module repositories/selecaoRepository
 */
import { prisma } from "../config/database.js";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";

class SelecaoRepository {
  /**
   * @async
   * @function findAll
   * @returns {Promise<Selecao[]>} Array com todas as seleções
   */
  async findAll() {
    return prisma.selecao.findMany();
  }

  /**
   * @async
   * @function findById
   * @param {number} id - ID da seleção
   * @returns {Promise<Selecao | null>} Seleção encontrada ou null se não existir
   */
  async findById(id: number) {
    return prisma.selecao.findUnique({
      where: { id },
    });
  }

  /**
   * @async
   * @function create
   * @param {CreateSelecao} data - Dados da nova seleção
   * @returns {Promise<Selecao>} Seleção criada
   */
  async create(data: CreateSelecao) {
    return prisma.selecao.create({
      data,
    });
  }

  /**
   * @async
   * @function update
   * @param {number} id - ID da seleção a ser atualizada
   * @param {UpdateSelecao} data - Dados para atualização
   * @returns {Promise<Selecao>} Seleção atualizada
   */
  async update(id: number, data: UpdateSelecao) {
    return prisma.selecao.update({
      where: { id },
      data,
    });
  }

  /**
   * @async
   * @function delete
   * @param {number} id - ID da seleção a ser deletada
   * @returns {Promise<Selecao>} Seleção deletada
   */
  async delete(id: number) {
    return prisma.selecao.delete({
      where: { id },
    });
  }
}

export default new SelecaoRepository();
