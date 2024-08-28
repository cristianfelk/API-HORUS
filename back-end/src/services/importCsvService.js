const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

const db = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'APP_SECRETARIA',
  password: 'admin',
  port: 5434,
});

async function connectDatabase() {
  try {
    await db.connect();
    console.log('Conectado ao banco de dados PostgreSQL');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
}

async function insertLogradouro(data) {
  const query = `
    insert into logradouro (municipio_id, cep, logradouro, complemento, bairro)
    values ($1, $2, $3, $4, $5)
  `;
  const values = [data.municipio_id, data.cep, data.logradouro, data.complemento, data.bairro];

  try {
    await db.query(query, values);
    console.log(`Registro inserido: ${data.logradouro}`);
  } catch (err) {
    console.error('Erro ao inserir registro:', err);
  }
}

async function insertMunicipio(data) {
  const query = `
    insert into municipio (id, nome, ibge, uf)
    values ($1, $2, $3, $4)
  `;
  const values = [data.id, data.nome, data.ibge, data.uf];

  try {
    await db.query(query, values);
    console.log(`Registro inserido: ${data.nome}`);
  } catch (err) {
    console.error('Erro ao inserir registro:', err);
  }
}

async function importCSV(filePath) {
  await connectDatabase();

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      insertLogradouro(row);
      insertMunicipio(row);
    })
    .on('end', () => {
      console.log('Importação do arquivo CSV concluída.');
      db.end();
    });
}

module.exports = {
  importCSV
};