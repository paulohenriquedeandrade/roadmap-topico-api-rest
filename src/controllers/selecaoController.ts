import { prisma } from "../config/database.js";
import { Request, Response } from "express";
import { CreateSelecao, UpdateSelecao } from "../types/selecao.types.js";

export const listarTodas = async (req: Request, res: Response) => {
  try {
    const selecoes = await prisma.selecao.findMany();

    res.status(200).json(selecoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar seleções" });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selecao = await prisma.selecao.findUnique({
      where: { id: Number(id) },
    });

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar seleção" });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { nome, grupo, titulos } = req.body as CreateSelecao;

    const selecao = await prisma.selecao.create({
      data: { nome, grupo, titulos },
    });

    res.status(201).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar seleção" });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, grupo, titulos } = req.body as UpdateSelecao;

    const selecao = await prisma.selecao.update({
      where: { id: Number(id) },
      data: { nome, grupo, titulos },
    });

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json(selecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar seleção" });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selecao = await prisma.selecao.delete({
      where: { id: Number(id) },
    });

    if (!selecao) {
      return res.status(404).json({ error: "Seleção não encontrada" });
    }

    res.status(200).json({ message: "Seleção deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar seleção" });
  }
};
