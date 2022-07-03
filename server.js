const express  = require('express');
const hand     = require('express-handlebars')
const router   = require('./routes.js')
const { Server: HttpServer} = require("http");
const { Server: IOServer}   = require("socket.io");

const app      = express()
const PORT     = 8080;

const httpServer            = new HttpServer(app);
const io                    = new IOServer(httpServer);

//app.engine('handlebars', hand.engine());
//app.set('view engine','handlebars');
//app.set('views','./views');

const messages = [
  { title: "Uno", price: 2500, thumbail:"http://un sitio web" },
  { title: "dos", price: 1500, thumbail:"http://un sitio web" },
  { title: "tres", price: 3500, thumbail:"http://un sitio web" }
];


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + "/public"));

//app.use('/api', router)

/*
app.get('/', (req, res) => {
    res.render('datos', { mensaje: "",
                          datoPie: ""
        });
  });
*/



io.on('connection',socket => {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);

  socket.on('new-message',data => {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
});

/*
app.listen(PORT, () =>{ 
  console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
*/
httpServer.listen(8080, function() {
  console.log(`Servidor corriendo en puerto ${PORT}`);
})

