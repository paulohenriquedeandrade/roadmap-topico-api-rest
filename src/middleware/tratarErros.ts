/**
 * Middleware para tratamento de erros
 * Captura erros lançados nas rotas e envia uma resposta adequada ao cliente.
 * @module middleware/tratarErros
 */
import { Request, Response, NextFunction } from "express";

/**
 * @function tratarErros
 * @param {Error} err - O erro capturado.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {NextFunction} next - A próxima função middleware.
 * @returns {void}
 */
export function tratarErros(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro no servidor.");
}
