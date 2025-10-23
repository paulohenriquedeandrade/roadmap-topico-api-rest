import { Request, Response, NextFunction } from "express";

export function validarSelecoes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nome, grupo } = req.body;

  if (!nome || !grupo || nome.trim() === "" || grupo.trim() === "") {
    return res.status(400).send("Nome e grupo da seleção são obrigatórios.");
  }

  next();
}
