export interface Selecao {
  id: number;
  nome: string;
  grupo: string;
  titulos: number;
}

export type CreateSelecao = Omit<Selecao, "id">;

export type UpdateSelecao = Partial<CreateSelecao>;
