const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// index.html dosyasını sun
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  socket.on("mesaj", (data) => {
    io.emit("mesaj", data); // herkese gönder
  });
});

server.listen(3000, () => {
  console.log("Sunucu çalışıyor: http://localhost:3000");
});
