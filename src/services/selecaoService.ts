import selecaoRepository from "../repositories/selecaoRepository.js";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class SelecaoService {
  async listarTodas() {
    return await selecaoRepository.findAll();
  }

  async buscarPorId(id: number) {
    const selecao = await selecaoRepository.findById(id);

    if (!selecao) {
      throw new NotFoundError("Seleção não encontrada");
    }

    return selecao;
  }

  async criar(data: CreateSelecao) {
    return await selecaoRepository.create(data);
  }

  async atualizar(id: number, data: UpdateSelecao) {
    await this.buscarPorId(id);

    return await selecaoRepository.update(id, data);
  }

  async deletar(id: number) {
    await this.buscarPorId(id);

    return await selecaoRepository.delete(id);
  }
}

export default new SelecaoService();
