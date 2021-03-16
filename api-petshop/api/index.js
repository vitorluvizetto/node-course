const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');


const router = require('./rotas/fornecedores');


app.use(bodyParser.json());

app.use('/api/fornecedores', router);

app.use((error, request, response, proximo) => {
    if (error instanceof NaoEncontrado) {
        response.status(404)
    }

    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
        response.status(400)
    }

    if (error instanceof ValorNaoSuportado) {
        response.status(406)
    }

    response.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('A API está funcionando!')
});