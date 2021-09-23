const express = require('express')
const app = express()

const http = require('http').Server(app);
const io = require('socket.io')(http);

const Contenedor = require('./contenedor.js')
const ContenedorMensajes = require('./contenedorMensajes.js')

const contenedor = new Contenedor()
const mensajes = new ContenedorMensajes('mensajes.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', contenedor.getAll());

    socket.on('update', producto => {
        contenedor.save(producto)
        io.sockets.emit('productos', contenedor.getAll());
    })

    socket.emit('mensajes', await mensajes.getAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.save(mensaje)
        io.sockets.emit('mensajes', await mensajes.getAll());
    })
});


http.listen(8080, () => console.log('Servidor corriendo en puerto 8080...'));