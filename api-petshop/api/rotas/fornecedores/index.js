const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

router.get('/', async (request, response) => {
    const results = await TabelaFornecedor.listar();
    response.status(200);
    response.send(
        JSON.stringify(results)
    )
})

router.post('/', async (request, response, proximo) => {
    try {
        const dadosRecebidos = request.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        response.status(201);
        response.send(JSON.stringify(fornecedor));

    } catch (error) {
        // response.status(400);
        // response.send(JSON.stringify({
        //     mensagem: error.message
        // }))
        proximo(error);
    }
});

router.get('/:idFornecedor', async (request, response, proximo) => {
    try {
        const id = request.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar();
        response.status(200);
        response.send(JSON.stringify(fornecedor));
    } catch (error) {
        proximo(error);
    }
})

router.put('/:idFornecedor', async (request, response, proximo) => {
    try {
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar();
        response.status(204);
        response.end();

    } catch (error) {
        proximo(error);
    }
})

router.delete('/:idFornecedor', async (request, response, proximo) => {
    try {
        const id = request.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();
        response.status(204);
        response.end();
    } catch (error) {
        proximo(error);
    }
})

module.exports = router;