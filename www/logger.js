/**
 * logger initialization.
 * 
 * const logger = require('./logger');
 * logger.info('');
 * 
 * This logger is a wrapper for winston logger.
 * 
 * author pc ref. Liao
 */
const 
    winston = require('winston'),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                name: 'console',
                colorize: true,
                level: 'info',
                timestamp: true
            }),
            new (winston.transports.File)({
                name: 'info-file',
                dirname: '/tmp',
                filename: 'datanode-info.log',
                level: 'info',
                json: false,
                maxsize: 100 * 1024 * 1024,
                maxFiles: 20,
                timestamp: function() {
                    return new Date().toString();
                }
            }),
            new (winston.transports.File)({
                name: 'error-file',
                dirname: '/tmp',
                filename: 'datanode-error.log',
                level: 'error',
                json: false,
                maxsize: 100 * 1024 * 1024,
                maxFiles: 20,
                timestamp: function() {
                    return new Date().toString();
                }
            })
        ]
    });

module.exports = logger;