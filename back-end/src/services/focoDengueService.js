const db = require('../configs/pg')

const postFoco = async (params) => {
    try {
        const sql_post = ` insert into focos_dengue (descricao, latitude, longitude)
            values ( 
                    '${params.descricao}', 
                    ${params.latitude},
                    ${params.longitude})`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getFoco = async () => {
    const sql_get = `select * from focos_dengue`;
    return await db.query(sql_get);
}

module.exports = {
    postFoco,
    getFoco
};