const express = require('express');
const path = require('path')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname) + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

// configuracion de Socket.io

io.on('connection', (socket) =>{
    socket.emit("messageList", messages)
    console.log("Nuevo cliente se ha conectado")

    socket.on("newMessage", (message) => {
        messages.push(message)
        io.emit("newMessage", {
            socketId: socket.id,
            message: message
        })
    })
})




http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
