import jogadorRepository from "../repositories/jogadorRepository.js";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";

class JogadorService {
  async listarTodos() {
    return await jogadorRepository.findAll();
  }

  async buscarPorId(id: number) {
    return await jogadorRepository.findById(id);
  }

  async criar(data: CreateJogador) {
    return await jogadorRepository.create(data);
  }

  async atualizar(id: number, data: UpdateJogador) {
    return await jogadorRepository.update(id, data);
  }

  async deletar(id: number) {
    return await jogadorRepository.delete(id);
  }
}

export default new JogadorService();
