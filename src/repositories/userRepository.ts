import { prisma } from "../config/database.js";
import { User, CreateUser } from "../types/user.types.js";

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(userData: CreateUser): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

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
