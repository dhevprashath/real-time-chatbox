// Step 1: Initialize the backend with Node.js and Socket.io
// Install dependencies: npm install express socket.io cors
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Frontend URL
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for chat messages
    socket.on('send_message', (data) => {
        console.log(`Message from ${socket.id}:`, data);
        io.emit('receive_message', data); // Broadcast the message
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
