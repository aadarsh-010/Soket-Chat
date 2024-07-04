import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./src/app.js";
import logger from "./src/configs/logger.config.js";
import "./src/configs/connection.js";
import SocketServer from "./SocketServer.js";

// console.log(process.env.PORT)
const PORT = process.env.PORT ;

let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
//   throw new Error("afsaf");
});

//socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: true,
  },
});
io.on("connection", (socket) => {
  logger.info("socket io connected successfully.");
  SocketServer(socket, io);
});

//handle server errors
const exitHandler = () => {
    if (server) {
      logger.info("Server closed.");
      process.exit(1);
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  
  //SIGTERM - use to smoothly end close the server if in case process end due to some issues..
//   process.on("SIGTERM", () => {
//     if (server) {
//       logger.info("Server closed.");
//       process.exit(1);
//     }
//   });