const monitoramentoService = require('../services/monitoramentoService');

async function getMonitoramento(req, res) {
  try {
    const data = await monitoramentoService.getMonitoramento();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMonitoramento(req, res) {
  try {
    const updatedData = await monitoramentoService.updateMonitoramento(req.body);
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMonitoramento,
  updateMonitoramento,
};
