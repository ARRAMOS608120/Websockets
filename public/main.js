const socket = io.connect();


const formProducto = document.getElementById('formProducto')
formProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formProducto[0].value,
        price: formProducto[1].value,
        thumbnail: formProducto[2].value
    }
    socket.emit('update', producto);
})

socket.on('productos', productos => {
    listadoHTML(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function listadoHTML(productos) {
    return fetch('plantillas/listaProductos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}


const inputMail = document.getElementById('inputMail')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formMensaje = document.getElementById('formMensaje')
formMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = { autor: inputMail.value, texto: inputMensaje.value }
    socket.emit('nuevoMensaje', mensaje);
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = listMensajesHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function listMensajesHTML(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}
