const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;

const router = require('./rotas/fornecedores');


app.use(bodyParser.json());

app.use((request, response, proximo) => {
    let formatoRequisitado = request.header('Accept');

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        response.status(406);
        response.end();
        return
    }

    response.setHeader('Content-Type', formatoRequisitado);
    proximo();
})

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

    const serializador = new SerializadorErro(
        response.getHeader('Content-Type')
    )
    response.send(
        serializador.serializar({
            mensagem: error.message,
            id: error.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('A API está funcionando!')
});