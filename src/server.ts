const debug = require("debug")("socketio-server:server");
// const http = require("http")
import * as http from "http"
// const metadata = require('reflect-metadata')
import "reflect-metadata"
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
import * as cors from "cors";
// const cors = require("cors")
// const {useSocketServer} = require("socket-controllers")
// const {Server} = require("socket.io")
import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";


var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};


  res.status(err.status || 500);
  res.render("error");
});



function socketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(io, { controllers: [__dirname + "/api/controllers/*.ts"] });
  return io;
};



const PORT = process.env.PORT || 9000;
app.set("port", PORT);


const server = http.createServer(app);


server.listen(PORT, () =>  console.log(PORT));


const io = socketServer(server);
