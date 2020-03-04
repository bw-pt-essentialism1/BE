const express = require('express');
const authRouter = require('./routes/auth/auth-router');
const usersRouter = require('./routes/users/users-router');
const valuesRouter = require('./routes/values/values-router');
const projectsRouter = require('./routes/projects/projects-router');

const authWare = require('./middleware/authenticate-middleware');

const server = express();


server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', authWare.validateUser, usersRouter);
server.use('/values', valuesRouter);
server.use('/projects', authWare.validateUser, projectsRouter);


module.exports = server;