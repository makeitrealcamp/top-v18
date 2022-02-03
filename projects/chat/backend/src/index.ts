import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/chat");

const { PORT } = process.env;
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("send_message", (data) => {
    console.log(`${data.from} typed: "${data.content}"`);

    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", routes);

httpServer.listen(PORT, () => console.log(`Running on port ${PORT}...`));
