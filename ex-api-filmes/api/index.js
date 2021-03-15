const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3003, console.log('funcionando tranquilasso'));


app.get('/api/filmes', (request, response) => {
    const filmes = [
        {nome: 'Harry Potter'},
        {nome: 'Matrix'},
        {nome: 'Constantine'}
    ]
    response.send(JSON.stringify(filmes));
});