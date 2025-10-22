import prisma from "../config/database.js";

export const listarTodos = async (req, res) => {
    try {
        const jogadores = await prisma.jogador.findMany({ include: { selecao: true } });

        res.status(200).json(jogadores);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar jogadores" });
    }
}

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const jogador = await prisma.jogador.findUnique({
            where: { id: Number(id) },
            include: { selecao: true }
        });

        if (!jogador) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }

        res.status(200).json(jogador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar jogador" });
    }
}

export const criar = async (req, res) => {
    try {
        const { nome, posicao, numeroCamisa, selecaoId } = req.body;

        const jogador = await prisma.jogador.create({
            data: {
                nome,
                posicao,
                numeroCamisa,
                selecao: { connect: { id: selecaoId } }
            }
        });

        res.status(201).json(jogador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar jogador" });
    }
}

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, posicao, numeroCamisa, selecaoId } = req.body;

        const jogador = await prisma.jogador.update({
            where: { id: Number(id) },
            data: {
                nome,
                posicao,
                numeroCamisa,
                selecao: { connect: { id: selecaoId } }
            }
        });

        if (!jogador) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }

        res.status(200).json(jogador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar jogador" });
    }
}

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        const jogador = await prisma.jogador.delete({
            where: { id: Number(id) }
        });

        if (!jogador) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }

        res.status(200).json(jogador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar jogador" });
    }
}
