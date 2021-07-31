const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const router = require('./router.js');
const cors = require('cors');
const {addUser, removeUser, getUser, getUserRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log("We have a new connection");
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});
        if(error) return callback(error);
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUserRoom(user.room) });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user?.room).emit('message', {user: user?.name, text: message});
        io.to(user?.room).emit('roomData', {room: user?.room, users: getUserRoom(user.room)});
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the room`});
        }
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));