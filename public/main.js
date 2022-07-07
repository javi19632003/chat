const ClasProd        = require('./clases.js');
const c1              = new ClasProd('productos.json');

const socket = io.connect();
socket.on('messages', data => {
    console.log("on de main");
});

function render(data) {
    console.log("render de main");

    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.title}</strong>:
            <em>${elem.price}</em>:
            <em> ${elem.thumbail}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    console.log("addmessage de main");

    const mensaje = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbail: document.getElementById('thumbail').value
    };
    socket.emit('new-message', mensaje);
    console.log("emit de main");

    return false;
}

socket.on('messages', function(data) { render(data); });
