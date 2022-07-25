const conexion = require('../conexiones/sqlite')
const knex = require('knex')(conexion)


const modeloSqLite = ( async () => {
    try {
        if( await knex.schema.hasTable('mensa')) {
            await knex.schema.dropTable('mensa')
        }

        await knex.schema.createTable('mensa', table => {
            table.increments('id').primary()
            table.string('email').notNullable()
            table.string('date').notNullable()
            table.string('messageText').notNullable()
        })

        console.log('TABLA DE MENSAGES CREADA !!!!!!');

    } catch (err) {
        console.log('salgo por error sql3')
        console.log(err)
    } finally {
        knex.destroy()
    }
})

module.exports = modeloSqLite
