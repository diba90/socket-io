const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const filename = "index.html";
  res.sendFile(filename, options);
});

let users = 0;

io.on("connection", (socket) => {
  console.log("Connected");
  users++;
  //   io.sockets.emit("broadcast", { message: users + " users connected" });
  socket.emit("newuser", { message: "Hi, Welcome aboard" });

  socket.broadcast.emit("newuser", { message: users + " users connected" });

  //   socket.on("myCustomEvent", (data) => {
  //     console.log(data);
  //   });
  //   setTimeout(() => {
  //     socket.send("Send message from server side");
  //     socket.emit("myCustomEvent", {
  //       description: "A custom message from serve side",
  //     });
  //   }, 3000);

  socket.on("disconnect", () => {
    console.log("Disconnected");
    users--;
    socket.broadcast.emit("newuser", {
      message: users + " users disconnected",
    });
    // io.sockets.emit("broadcast", { message: users + " users disconnected" });
  });
});

http.listen(2000, () => {
  console.log("Server is Up - Port 2000");
});
