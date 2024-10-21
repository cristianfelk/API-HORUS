const db = require('../configs/pg')

async function getMonitoramento() {
  const result = await db.query('select * from monitoramento order by id desc limit 1');
  return result.rows[0];
};

async function updateMonitoramento(data) {
  const { casos_confirmados, casos_mortes, casos_monitorados, casos_ativos } = data;
  const result = await db.query(
    `update monitoramento
     set casos_confirmados = $1, casos_mortes = $2, casos_monitorados = $3, casos_ativos = $4
     where id = (select id from monitoramento order by id desc limit 1)
     returning *`,
    [casos_confirmados, casos_mortes, casos_monitorados, casos_ativos]
  );
  return result.rows[0];
};

module.exports = {
  getMonitoramento,
  updateMonitoramento,
};
