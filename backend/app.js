require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const HttpError = require('./utils/http-error');
const eventRoutes = require('./routes/event.route');
const _Event = require('./models/event.model');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
});

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/events', eventRoutes);

app.use((req, res, next) => {
  const error = new HttpError('could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// connect to the mongoDB atlas database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB atlas database");

    // open a change stream on the events collection
    const changeStream = _Event.watch();

    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.emit('hello', "hello dude!");

      changeStream.on('change', change => {
        if (change.operationType === 'insert') {
          socket.emit('newEvent', change.fullDocument);
        }
      });
    });

    server.listen(process.env.PORT, '0.0.0.0');
  })
  .catch((err) => {
    console.log(err);
  });