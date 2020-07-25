var socket = io();

var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(respuesta) {
        renderizarUsuarios(respuesta);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre,
//     mensaje: txtMensaje.val()
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensaje(mensaje, false);
    scrollBottom();
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(respuesta) {
    renderizarUsuarios(respuesta);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log(mensaje);
});