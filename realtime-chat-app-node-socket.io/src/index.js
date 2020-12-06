const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");

app.use(express.static(publicDir));

let count = 0;

io.on("connection", (socket) => {
  socket.emit("countUpdated", count);
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
