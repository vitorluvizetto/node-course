const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

router.get('/', async (request, response) => {
    const results = await TabelaFornecedor.listar();
    response.send(
        JSON.stringify(results)
    )
})

router.post('/', async (request, response) => {
    const dadosRecebidos = request.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    response.send(JSON.stringify(fornecedor));
});

router.get('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar();
        response.send(JSON.stringify(fornecedor));
    } catch (error) {
        response.send(JSON.stringify({
            mensagem: error.message
        }))
    }
})

router.put('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar();
        response.end()

    } catch (error) {
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = router;