import { prisma } from "../config/database.js";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";

class SelecaoRepository {
  async findAll() {
    return prisma.selecao.findMany();
  }

  async findById(id: number) {
    return prisma.selecao.findUnique({
      where: { id },
    });
  }

  async create(data: CreateSelecao) {
    return prisma.selecao.create({
      data,
    });
  }

  async update(id: number, data: UpdateSelecao) {
    return prisma.selecao.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.selecao.delete({
      where: { id },
    });
  }
}

export default new SelecaoRepository();
