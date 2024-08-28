const { importCSV } = require('./services/importCsvService');

const fileCsv = 'C:\\Users\\crist\\OneDrive\\Área de Trabalho\\API-DENGUE\\back-end\\src\\db\\dados_logradouro.csv';

importCSV(fileCsv);