'use strict';

const 
    _ = require('lodash'),
    logger = require('./logger'),
    env = process.env.NODE_ENV;

let cfg = require('./config_default');

if(env) {
    let overrideFileName = 'config_' + env;
    logger.info(`will load override config: ${overrideFileName}...`);
    try {
        let overrideFile = require('./' + overrideFileName);
        cfg = _.merge(cfg, overrideFile);
        logger.info(`override config ${overrideFileName} loaded ok.`);
    } catch(e) {
        logger.warn(`failed to load override config ${overrideFileName}.`, e);
    }
}

logger.debug(`configuration loaded: ` + JSON.stringify(cfg, null, '  '));

module.exports = cfg;