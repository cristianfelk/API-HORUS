const db = require('../configs/pg')

const postFiscalizacaoDados = async (params) => {
    try {
        const sql_post = ` insert into fiscalizacao_dados (id_fiscalizacao, dados)
            values (${params.id_fiscalizacao},
                    ${params.dados})`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getFiscalizacaoDados = async () => {
    const sql_get = `select * from fiscalizacao_dados`
    return await db.query(sql_get)
}

const deleteFiscalizacaoDados = async (params) => {
    const sql_delete = `delete from fiscalizacao_dados where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putFiscalizacaoDados = async (params) => {
    const sql_put = `update fiscalizacao_dados set
            id_fiscalizacao = $2, 
            dados = $3
            where id = $1`
    const { id, id_fiscalizacao, dados,  } = params 
    return await db.query(sql_put, [id, id_fiscalizacao, dados, ])
}

const patchFiscalizacaoDados = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update fiscalizacao_dados set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports = {
    postFiscalizacaoDados,
    getFiscalizacaoDados,
    deleteFiscalizacaoDados,
    putFiscalizacaoDados,
    patchFiscalizacaoDados
};