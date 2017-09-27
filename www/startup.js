'use strict'

const 
    PORT = 3000,
    logger = require('./logger'),
    app = require('./app');

app.listen(PORT);

logger.info(`application mode at ${PORT}...`);