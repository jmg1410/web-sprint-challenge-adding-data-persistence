// build your server here and require it from index.js
const express = require('express');
const projectsRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
const tasksRouter = require('./task/router');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

// Error handler
server.use((err, req, res, next) => {
  console.error('🔥 Error in middleware:', err);
  res.status(500).json({
    customMessage: 'something went wrong inside the server!',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
