const db = require('../configs/pg')

const postFiscalizacao = async (params) => {
    try {
        const sql_post = ` insert into fiscalizacao (quarteirao, sequencia, numero, usuario_id, data_fiscalizacao, bairro_fiscalizacao)
            values ('${params.quarteirao}',
                    '${params.sequencia}',
                    '${params.numero}',
                    ${params.usuario_id},
                    current_timestamp,
                    ${params.bairro_fiscalizacao})`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getFiscalizacao = async () => {
    const sql_get = `select * from fiscalizacao`
    return await db.query(sql_get)
}

const deleteFiscalizacao = async (params) => {
    const sql_delete = `delete from fiscalizacao where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putFiscalizacao = async (params) => {
    const sql_put = `update fiscalizacao set
            quarteirao = $2,
            sequencia = $3,
            numero = $4
            usuario_id = $5, 
            data_fiscalizacao = $6,
            bairro_fiscalizacao = $7
            where id = $1`
    const { id, quarteirao, sequencia, numero, usuario_id, data_fiscalizacao, bairro_fiscalizacao } = params 
    return await db.query(sql_put, [id, quarteirao, sequencia, numero, usuario_id, data_fiscalizacao, bairro_fiscalizacao])
}

const patchFiscalizacao = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update fiscalizacao set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports = {
    postFiscalizacao,
    getFiscalizacao,
    deleteFiscalizacao,
    putFiscalizacao,
    patchFiscalizacao
};