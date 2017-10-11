'use strict'

/**
 * 基础人类restful接口
 * author pc 2017/10/11
 */

const 
    logger = require('../../logger'),
    db = require('../../db'),
    Human = db.Human;

async function _getHumans() {
    return await Human.findAll({

    });
}

module.exports = {
    'GET /api/humans': async function(ctx, next) {
        ctx.rest(await _getHumans());
    }
}