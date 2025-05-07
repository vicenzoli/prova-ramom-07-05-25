const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8000;

app.use(express.json());

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toISOString(). replace('T',' ').substring(0,19);
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`

    fs.appendFileSync('logs.txt', mensagem, 'utf8');
    return id;
}

app.post('/logs', (req, res) => {
    const {nome } = req.body;

    if (!nome) {
        return res.status(400).json({erro: 'Nome é obrigatório.'});
    }

    const id = registrarLog(nome);
    res.status(201).json({mensagem: 'Log registrado com sucesso.', id});
});

app.get('/logs/:id', (req, res) => {
    const { id } = req.params;

    const logs = fs.readFileSync('logs.txt', 'utf8').split('\n');
    const encontrado = logs.find(linha => linha.startsWith(id));

    if (encontrado) {
        res.status(200).json({ log: encontrado});
    } else {
        res.status(404).json({ erro: 'Log não encontrado.'});
    }
});

app.get('/', (req, res) => {
    res.send('Ta funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});