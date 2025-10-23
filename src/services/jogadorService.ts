import jogadorRepository from "../repositories/jogadorRepository.js";
import { CreateJogador, UpdateJogador } from "../types/jogador.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class JogadorService {
  async listarTodos() {
    return await jogadorRepository.findAll();
  }

  async buscarPorId(id: number) {
    const jogador = await jogadorRepository.findById(id);

    if (!jogador) {
      throw new NotFoundError("Jogador não encontrado");
    }

    return jogador;
  }

  async criar(data: CreateJogador) {
    return await jogadorRepository.create(data);
  }

  async atualizar(id: number, data: UpdateJogador) {
    await this.buscarPorId(id);

    return await jogadorRepository.update(id, data);
  }

  async deletar(id: number) {
    await this.buscarPorId(id);

    return await jogadorRepository.delete(id);
  }
}

export default new JogadorService();
