import { Request, Response, NextFunction } from "express";

export function tratarErros(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro no servidor.");
}
