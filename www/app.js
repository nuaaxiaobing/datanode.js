'user strict'

/**
 * 根据koa的中间件原则
 * 启动加载所有中间件
 * author pc ref. Liao  2017/9/23
 */
const 
    isProduction = (process.env.NODE_ENV === 'production'),
    HOSTNAME = require('os').hostname(),
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    db = require('./db'),
    restify = require('./middlewares/restify'),
    controller = require('./middlewares/controller'),
    templating = require('./middlewares/templating'),
    logger = require('./logger');

let app = new Koa();

process.isProduction = isProduction;

app.use(async (ctx, next) => {
    logger.info(`will process request: ${ctx.request.method} ${ctx.request.url}...`);
    let 
        start = Date.now(),
        execTime;
    try {
        await next();
    } catch (e) {
        logger.error('error process request', e);
    }
    logger.info(`Response: ${ctx.response.status}`);
    execTime = Date.now() - start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
    ctx.response.set('X-Host',HOSTNAME);
});

app.use(bodyParser());

let filters = {
    json: (input) => {
        return JSON.stringify(input);
    },
    addslashes: (input) => {
        return input;
    },
    min: function(input) {
        if(input <= 60) {
            return input + 'minutes';
        }
        let
            h = parseInt(input / 60),
            m = input % 60;
        return h + 'hours' + m + 'minutes';
    }
};


// app.use(templating('views',{
//     noCache: !isProduction,
//     watch: !isProduction,
//     filters: filters
// }));

//加载restfun中间件
app.use(restify());

//加载koa router中间件
app.use(controller());

module.exports = app;