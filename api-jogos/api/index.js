const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())


const listGames = []



app.post('/api/jogos', (request, response) => {
    try {
        if (!request.body.nome || !request.body.plataforma) {
            throw new Error('Campos inválidos');
        }
        listGames.push(request.body);
        response.send(JSON.stringify(request.body));
        
    } catch (error) {
        response.send(JSON.stringify({message: error.message}))
    }
});

app.get('/api/jogos', (request,response) => {
    response.send(JSON.stringify(listGames));
})



app.listen(3003, () => {
    console.log('API Funfando')
})