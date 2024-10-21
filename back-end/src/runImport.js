const { importCSV } = require('./services/importCsvService');

const municipioCSV = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_municipio.csv';
const logradourosCSV = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_logradouro.csv';

importCSV(municipioCSV, logradourosCSV);