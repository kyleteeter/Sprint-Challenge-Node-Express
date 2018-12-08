// Import Node Modules
const express = require('express');

const helmet = require('helmet')
const logger = require('morgan')
const server = express()
const PORT = 4400;

const actionRouter = require('./routers/action_router');

const projectRouter = require('./routers/project_router');

server.use(
    express.json(),
    helmet(),
    logger('tiny'),
);

server.use(express.json());
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

// Listening
server.listen(PORT, () => {
    console.log(`Server is running and listening to ${PORT}`)
})