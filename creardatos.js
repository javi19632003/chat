const crearMysql  = require('./src/modelo/modelomysql');
const crearSqLite = require('./src/modelo/modelosqlite')


    try {
       crearMysql()
       crearSqLite()

    } catch (err) {
        console.log('salgo por error de crear datos')
        console.log(err)
    } 
