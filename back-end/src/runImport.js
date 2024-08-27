const { importCsvToDatabase } = require('./services/importCsvService');

const csvFilePath = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_logradouro.csv';

importCsvToDatabase(csvFilePath);