import { prisma } from "../config/database.js";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";

class JogadorRepository {
  async findAll() {
    return prisma.jogador.findMany({
      include: { selecao: true },
    });
  }

  async findById(id: number) {
    return prisma.jogador.findUnique({
      where: { id },
      include: { selecao: true },
    });
  }

  async create(data: CreateJogador) {
    return prisma.jogador.create({
      data,
    });
  }

  async update(id: number, data: UpdateJogador) {
    return prisma.jogador.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.jogador.delete({
      where: { id },
    });
  }
}

export default new JogadorRepository();
