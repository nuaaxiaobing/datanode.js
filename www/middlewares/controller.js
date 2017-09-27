'user strict'

const 
    fs = require('fs'),
    path = require('path'),
    Router = require('koa-router'),
    logger = require('../logger');

const METHOD = {
    'GET': 'get',
    'POST': 'post',
    'PUT': 'put',
    'DELETE': 'del'
};

function _addMapping(rt, mapping) {
    let url, method, path;
    for (url in mapping) {
        for (method in METHOD) {
            if (url.startsWith(method + ' ')) {
                path = url.substring(method.length).trim();
                rt[METHOD[method]](path, mapping[url]);
                logger.info(`register URL Mapping: ${url}`);
                break;
            }
        }
    }
}

function _addControllers(rt, dir) {
    let basedir = path.dirname(__dirname);
    fs.readdirSync(basedir + '/' + dir).filter((filename) => {
        return filename.endsWith('.js');
    }).forEach((file) => {
        logger.info(`process controller: ${file}`);
        let mapping = require(basedir + '/' + dir + '/' + file);
        _addMapping(rt, mapping);
    });
}

module.exports = function(dir = 'controllers') {
    let rt = new Router({
        prefix: '/datanode'
    });
    _addControllers(rt,dir);
    return rt.routes();
}
