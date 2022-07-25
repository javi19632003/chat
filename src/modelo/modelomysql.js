
const conexion = require('../conexiones/mysql')
const knex     = require('knex')(conexion)

const modeloMysql = ( async () => {
    try {
        if( await knex.schema.hasTable('products')) {
            await knex.schema.dropTable('products')
        }
        
        await knex.schema.createTable('products', (table) => {
            table.increments('id').primary()
            table.string('title').notNullable()
            table.string('thumbnail').notNullable()
            table.integer('price').notNullable()
        })

        console.log('TABLA DE PRODUCTOS CREADA !!!!!!');

    } catch (err) {
        console.log('sale por error')
        console.log(err)
    } finally {
        knex.destroy()
    }
})

module.exports = modeloMysql
