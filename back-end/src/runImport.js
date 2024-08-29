const { importCSV } = require('./services/importCsvService');

const logradourosCSV = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_logradouro.csv';
const municipioCSV = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_municipio.csv';

importCSV(logradourosCSV, municipioCSV);