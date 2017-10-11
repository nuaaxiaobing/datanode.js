'use strict'

/**
 * 公安 保安 restful接口
 * author pc 2017/10/11
 */

 const 
    logger = require('../../logger'),
    db = require('../../db'),
    BAXX = db.BAXX;

async function _getBAXXs() {
    return await BAXX.findAll();
}

module.exports = {
    'GET /api/baxxs': async function(ctx, next) {
        ctx.rest(await _getBAXXs());
    }
}

