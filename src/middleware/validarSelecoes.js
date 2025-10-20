export function validarSelecoes(req, res, next) {
    const { selecao, grupo } = req.body;

    if (!selecao || !grupo || selecao.trim() === "" || grupo.trim() === "") {
        return res.status(400).send("Nome e grupo da seleção são obrigatórios.");
    }

    next();
}
