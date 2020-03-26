const connection = require('../database/connection');
const crypto = require('crypto');

/**
 * Rota / Recurso
 */

/**
 * Tipos de parametro:
 * 
 * Query params: Parametros nomeados enviados na rota apos "?" (filtro, paginacao)
 * Route params: Parametros utilizados para identificar recursos
 * Request body: Corpo da requisicao, utilizado para criar ou alterar recursos
 */

 /**
  * BD
  * Driver: SELECT * FROM users
  * Query builder: table('users').select('*').where()
  */


module.exports = {
    async index(require, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(require, response){
        const {name, email, whatsapp, city, uf} = require.body;

        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        return response.json({id});
    }
};