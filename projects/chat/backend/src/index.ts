import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/chat');

const { PORT } = process.env;
const app: Express = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use('/api', routes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  },
});
io.on('connection', (socket: any) => {
  console.log('User ' + socket.id + ' connected');
  socket.on('send_message', (data: any) => {
    console.log(`${data.from} typed: "${data.content}" in ${data.name}`);

    socket.broadcast.emit('receive_message', data);
  });
  socket.on('create_room', (data: any) => {
    console.log(`${data.from} created new room called: ${data.name}`);

    socket.broadcast.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('User ' + socket.id + ' disconnected');
  });
});

server.listen(PORT, () => console.log(`Running on port ${PORT}...`));
