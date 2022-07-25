const conexion = {
  client: 'sqlite3',
  connection: {
    filename: './src/datos/db/messages.db3',
  },
  useNullAsDefault: true
};

module.exports = conexion ;
