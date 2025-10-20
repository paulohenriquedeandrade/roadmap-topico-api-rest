export function tratarErros(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Ocorreu um erro no servidor.");
}
