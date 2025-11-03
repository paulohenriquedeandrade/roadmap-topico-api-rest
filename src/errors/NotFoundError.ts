/**
 * Erro customizado para recursos não encontrados.
 * @class NotFoundError
 * @extends Error
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
