'user strict'

/**
 * koa router中间件
 * 匹配所有controllers中的GET/POST/PUT/DELETE到koa router.
 * author pc ref. Liao 2017/9/23
 */

const 
    fs = require('fs'),
    path = require('path'),
    Router = require('koa-router'),
    utils = require('../utils'),
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

    let 
        res = utils.getAllFiles(dir),
        baseDir = path.dirname(__dirname);
    console.log(res);
    res.filter((filename) => {
        return filename.endsWith('.js');
    }).forEach((file) => {
        logger.info(`process controller: ${file}`);
        let mapping = require(baseDir + '/' + dir + '/' + file);
        _addMapping(rt,mapping);
    })

    // let basedir = path.dirname(__dirname);
    // fs.readdirSync(basedir + '/' + dir).filter((filename) => {
    //     return filename.endsWith('.js');
    // }).forEach((file) => {
    //     logger.info(`process controller: ${file}`);
    //     let mapping = require(basedir + '/' + dir + '/' + file);
    //     _addMapping(rt, mapping);
    // });
}

module.exports = function(dir = 'controllers') {
    let rt = new Router({
        prefix: '/datanode'
    });
    _addControllers(rt,dir);
    return rt.routes();
}
