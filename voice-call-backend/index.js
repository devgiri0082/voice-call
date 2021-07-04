const PORT = 8080;

let users = {};
const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");
app.use(cors());

let timer;
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addName", (data) => {
    users[socket.id] = data;
    console.log(users);
    io.emit("names", { users });
  });
  socket.on("deleteName", (data) => {
    delete users[data];
    console.log(users);
  });
  //   socket.emit(socket.id, "Hello world");

  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log(users);
  });
});

server.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
