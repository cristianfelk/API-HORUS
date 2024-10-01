const db = require('../configs/pg')

const postFoco = async (params) => {
    try {
        const sql_post = ` insert into focos_dengue (descricao, latitude, longitude, confirmado)
            values ( 
                    '${params.descricao}', 
                    ${params.latitude},
                    ${params.longitude},
                    ${params.confirmado})`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getFoco = async () => {
    const sql_get = `select * from focos_dengue where confirmado = true`;
    return await db.query(sql_get);
}

module.exports = {
    postFoco,
    getFoco
};