const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function registrarLog(nomeAluno) {
  const idUnico = uuidv4();
  const dataHora = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const mensagem = `${idUnico} - ${dataHora} - ${nomeAluno}\n`;

  fs.appendFile('logs.txt', mensagem, (err) => {
    if (err) {
      console.error('Erro ao registrar log:', err);
    } else {
      console.log('Log registrado com sucesso!');
    }
  });
}

module.exports = { registrarLog };