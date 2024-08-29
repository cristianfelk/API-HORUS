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

async function insertMunicipio(data) {
  const query = `
    insert into municipio (id, nome, ibge, uf)
    values ($1, $2, $3, $4)
  `;
  const values = [data.id, data.nome, data.ibge, data.uf];

  try {
    await db.query(query, values);
  } catch (err) {
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
  } catch (err) {
  }
}

async function importMunicipios(filePath) {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        for (const row of rows) {
          await insertMunicipio(row);
        }
        console.log('Importação dos municípios concluída.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Erro durante a leitura do CSV de municípios:', err);
        reject(err);
      });
  });
}

async function importLogradouros(filePath) {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        for (const row of rows) {
          await insertLogradouro(row);
        }
        console.log('Importação dos logradouros concluída.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Erro durante a leitura do CSV de logradouros:', err);
        reject(err);
      });
  });
}

async function importCSV(municipioFilePath, logradouroFilePath) {
  await connectDatabase();

  try {
    await importMunicipios(municipioFilePath);
    await importLogradouros(logradouroFilePath);
    console.log('Importação do arquivo CSV concluída.');
  } catch (err) {
    console.error('Erro durante o processo de importação:', err);
  } finally {
    db.end();
  }
}

module.exports = {
  importCSV
};