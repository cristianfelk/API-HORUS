const db = require('../configs/pg')

const postFiscalizacao = async (params) => {
    try {
        const sql_post = ` insert into fiscalizacao (
        quarteirao, sequencia, logradouro_fiscalizacao, numero, complemento, tipo_imovel, hora_entrada,
        visita, pendencia, status, usuario_id, a1, a2, b, c, d1, d2, e, eliminado, inicial, final, qtd_tubitos,
        im_trat, tipo_focal, qtd_grama, qtd_tratado, tipo_perifocal, qtd_gramas)
            values (
                '${params.quarteirao}',
                '${params.sequencia}',
                '${params.logradouro_fiscalizacao}',
                '${params.numero}',
                '${params.complemento}',
                '${params.tipo_imovel}',
                '${params.hora_entrada}', 
                '${params.visita}',
                '${params.pendencia}',
                ${params.status},
                ${params.usuario_id},
                '${params.a1}',
                '${params.a2}',
                '${params.b}',
                '${params.c}',
                '${params.d1}',
                '${params.d2}',
                '${params.e}',
                '${params.eliminado}',
                '${params.inicial}',
                '${params.final}',
                '${params.qtd_tubitos}',
                '${params.im_trat}',
                '${params.tipo_focal}',
                '${params.qtd_grama}',
                '${params.qtd_tratado}',
                '${params.tipo_perifocal}',
                '${params.qtd_gramas}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getFiscalizacao = async (page = 1, limit = 10, logradouro = '', complemento = '') => {
    const offset = (page - 1) * limit;
    let sql_get = `select *, to_char(hora_entrada, 'DD/MM/YYYY HH24:MI:SS') as format_data
                   from fiscalizacao where true`;
    let values = [];

    if (logradouro) {
        sql_get += ` and logradouro = $${values.length + 1}`;
        values.push(logradouro);
    }

    if (complemento) {
        sql_get += ` and complemento ilike $${values.length + 1}`;
        values.push(`%${complemento}%`);
    }

    sql_get += ` order by hora_entrada desc limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);

    return await db.query(sql_get, values);
};


const getTotalFiscalizacoes = async (logradouro = '', complemento = '') => {
    let sql_count = 'select count(*) as total from fiscalizacao where true';
    let values = [];

    if (logradouro) {
        sql_count += ` and logradouro = $${values.length + 1}`;
        values.push(logradouro);
    }

    if (complemento) {
        sql_count += ` and complemento ilike $${values.length + 1}`;
        values.push(`%${complemento}%`);
    }

    const result = await db.query(sql_count, values);
    return parseInt(result.rows[0].total, 10);
};

const getUltimasFiscalizacoes = async (limit = 5) => {
    const sql_get = `select *, to_char(hora_entrada, 'DD/MM/YYYY HH24:MI:SS') as hora_entrada
                     from fiscalizacao
                     order by id desc
                     limit $1`;
    return await db.query(sql_get, [limit]);
};

const deleteFiscalizacao = async (params) => {
    const sql_delete = `delete from fiscalizacao where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putFiscalizacao = async (params) => {
    const sql_put = `update fiscalizacao set
            quarteirao = $2,
            sequencia = $3,
            numero = $4,
            tipo_imovel = $5,
            status = $6
            usuario_id = $7, 
            data_fiscalizacao = $8,
            bairro_fiscalizacao = $9
            where id = $1`
    const { id, quarteirao, sequencia, numero, tipo_imovel, status, usuario_id, data_fiscalizacao, bairro_fiscalizacao } = params 
    return await db.query(sql_put, [id, quarteirao, sequencia, numero, tipo_imovel, status, usuario_id, data_fiscalizacao, bairro_fiscalizacao])
}

const patchFiscalizacao = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update fiscalizacao set ${fields} where id = ${params.id}`;
    await db.query(sql);
};

const getFiscalizacaoRel = async () => {
    const sql_get = `select * from fiscalizacao`;
    return await db.query(sql_get);
}

module.exports = {
    postFiscalizacao,
    getFiscalizacao,
    deleteFiscalizacao,
    putFiscalizacao,
    patchFiscalizacao,
    getTotalFiscalizacoes,
    getUltimasFiscalizacoes,
    getFiscalizacaoRel
};