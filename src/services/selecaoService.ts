import selecaoRepository from "../repositories/selecaoRepository.js";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";

class SelecaoService {
  async listarTodas() {
    return await selecaoRepository.findAll();
  }

  async buscarPorId(id: number) {
    return await selecaoRepository.findById(id);
  }

  async criar(data: CreateSelecao) {
    return await selecaoRepository.create(data);
  }

  async atualizar(id: number, data: UpdateSelecao) {
    return await selecaoRepository.update(id, data);
  }

  async deletar(id: number) {
    return await selecaoRepository.delete(id);
  }
}

export default new SelecaoService();
