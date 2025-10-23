export enum EnumPosicao {
  GOLEIRO = "GOLEIRO",
  ZAGUEIRO = "ZAGUEIRO",
  LATERAL = "LATERAL",
  VOLANTE = "VOLANTE",
  MEIA = "MEIA",
  ATACANTE = "ATACANTE",
}

export interface Jogador {
  id: number;
  nome: string;
  posicao: EnumPosicao;
  numeroCamisa: number;
  selecaoId: number;
}

export type CreateJogador = Omit<Jogador, "id">;

export type UpdateJogador = Partial<CreateJogador>;
