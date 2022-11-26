"use strict";
exports.__esModule = true;
var debug = require("debug")("socketio-server:server");
// const http = require("http")
var http = require("http");
// const metadata = require('reflect-metadata')
require("reflect-metadata");
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
// const cors = require("cors")
// const {useSocketServer} = require("socket-controllers")
// const {Server} = require("socket.io")
var socket_controllers_1 = require("socket-controllers");
var socket_io_1 = require("socket.io");
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
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*"
        }
    });
    (0, socket_controllers_1.useSocketServer)(io, { controllers: [__dirname + "/api/controllers/*.js"] });
    return io;
}
;
var PORT = process.env.PORT || 9000;
app.set("port", PORT);
var server = http.createServer(app);
server.listen(PORT, function () { return console.log(PORT); });
var io = socketServer(server);
