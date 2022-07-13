const express  = require('express');
const hand     = require('express-handlebars')
const router   = require('./routes.js')
const { Server: HttpServer} = require("http");
const { Server: IOServer}   = require("socket.io");

const app      = express()
const PORT     = 8080;

const httpServer            = new HttpServer(app);
const io                    = new IOServer(httpServer);

let mensajes  =[];
let productos =[];

//app.engine('handlebars', hand.engine());
app.set('view engine','ejs');
//app.set('views','views');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + "/public"));

app.use('/api', router)


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
  });

  io.on('connection', (socket) => {
    //Obtiene los mensajes
    socket.emit('mensajes', mensajes);
    //Entrega los mensajes
    socket.on('mensaje', data => {
        mensajes.push({ socketid : socket.id, mensaje: data })
        io.sockets.emit('mensajes', mensajes);        
    })

    socket.emit('productos', productos);
    socket.on('producto', data => {       
        io.sockets.emit('productos', data);        
    })
});

/*
app.listen(PORT, () =>{ 
  console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
*/

httpServer.listen(8080, function() {
  console.log(`Servidor corriendo en puerto ${PORT}`);
})
