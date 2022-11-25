import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // io.on("connection", (socket) => {

  // });

  useSocketServer(io, { controllers: [__dirname + "/api/controllers/*.ts"] });
  // console.log(__dirname)
  return io;
};
