/**
 * Repositório para operações CRUD na entidade "User".
 * Utiliza o Prisma Client para interagir com o banco de dados.
 * Fornece métodos para criar, ler e atualizar usuários.
 * @module repositories/userRepository
 */
import { prisma } from "../config/database.js";
import { User, CreateUser } from "../types/user.types.js";

class UserRepository {
  /**
   * Busca um usuário pelo email
   * @async
   * @function findByEmail
   * @param {string} email - Email do usuário
   * @returns {Promise<User | null>} Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Busca um usuário pelo ID
   * @async
   * @function findById
   * @param {number} id - ID do usuário
   * @returns {Promise<User | null>} Usuário encontrado ou null
   */
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Cria um novo usuário
   * @async
   * @function create
   * @param {CreateUser} userData - Dados do usuário a ser criado
   * @returns {Promise<User>} Usuário criado
   */
  async create(userData: CreateUser): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  /**
   * Atualiza o token de refresh do usuário
   * @async
   * @function updateRefreshToken
   * @param {number} id - ID do usuário
   * @param {string | null} refreshToken - Novo token de refresh ou null para remover
   * @returns {Promise<User>} Usuário atualizado
   */
  async updateRefreshToken(
    id: number,
    refreshToken: string | null
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}

export default new UserRepository();
