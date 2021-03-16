const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const siteAcessados = [];


app.post('/api/sites', (request, response) => {
    if (!request.body.url || !request.body.dataDeAcesso) {
        response.status(400);
        response.send(JSON.stringify({
            mensagem: 'Os campos "url" e "dataDeAcesso" são obrigatórios e não podem estar vazios!'
        }));
        response.end()
        return
    }

    const site = {
        url: request.body.url,
        dataDeAcesso: request.body.dataDeAcesso
    }
    siteAcessados.push(site);
    response.status(201);
    response.send(JSON.stringify(site));

})


app.listen(3001, () => {
    console.log('API funcionando');
})