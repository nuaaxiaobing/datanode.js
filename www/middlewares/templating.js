/**
 * node template.
 * wrapper nunjucks.
 * 
 */
'use strict'

const
    config = require('../config'),
    SECURE = config.session.https,
    nunjucks = require('nunjucks');

function createEnv(dir, opt) {
    let autoescape = opt.autoescape || false,
        throwOnUndefined = opt.throwOnUndefined || false,
        watch = opt.watch || false,
        noCache = opt.noCache || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(dir, {
                noCache: noCache,
                watch: watch
            }),{
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }),
        filter;
    
    if (opts.filters) {
        for (filter in opts.filters) {
           env.addFilter(filter,opts.filters[filter]);
        }
    }
    return env;
}

//用ctx.render封装env.render
module.exports = (dir, opts) => {
    let env = createEnv(dir, opts);
    return async (ctx, next) => {
        ctx.render = function(view, model) {
            let 
                viewPath = view,
                path = ctx.request.path;
            if(! path.startWith('/manage/')) {
                viewPath = 'themes/' + ctx.state.__theme__ + '/' + view;
            }
            if(SECURE) {
                ctx.response.set('Content-Security-Policy', 'upgrade-insecure-requests');
            }
            ctx.response.type = 'text/html';
            ctx.response.body = env.render(viewPath, Object.assign({}, ctx.state || {}, model || {}));
        };
        await next();
    };
};