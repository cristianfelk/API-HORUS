const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

const client = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'APP_SECRETARIA',
  password: 'admin',
  port: 5434,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados PostgreSQL');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
}

async function insertLogradouro(data) {
  const query = `
    INSERT INTO logradouro (municipio_id, cep, logradouro, complemento, bairro)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [data.municipio_id, data.cep, data.logradouro, data.complemento, data.bairro];

  try {
    await client.query(query, values);
    console.log(`Registro inserido: ${data.logradouro}`);
  } catch (err) {
    console.error('Erro ao inserir registro:', err);
  }
}

async function importCsvToDatabase(filePath) {
  await connectToDatabase();

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      insertLogradouro(row);
    })
    .on('end', () => {
      console.log('Importação do arquivo CSV concluída.');
      client.end();
    });
}

module.exports = {
  importCsvToDatabase
};