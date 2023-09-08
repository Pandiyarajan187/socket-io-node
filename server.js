// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files (e.g., HTML, CSS, JS) from the "public" directory
// app.use(express.static('public'));

// Define a connection event handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Define a custom event 'chat message'
  socket.on('chat message', (message) => {
    console.log('Received message:', message);

    // Broadcast the received message to all connected clients
    io.emit('chat message', message);
  });

  // Define a disconnection event handler
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
