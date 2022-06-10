const Koa = require('koa');
const router = require('@koa/router')();
const app = new Koa();

var syntax = {
    $: {
        api: {
            _static: {
                 execStatement: (done, ctx) => {

                    if(ctx.method){
                        router[ctx.method](ctx.path, _ctx => {
                            global.puzzle.parse(ctx.code)
                            _ctx.body = ctx.return;
                        })

                        app.use(router.routes());
                    }
                    done();
                 }
            },
            start: {
                follow: ["{port}"],
                method: function(ctx, data){
                    app.listen(data);
                    console.log('listening on...', data)
                }
            },
            on: {
                follow: ["{method,path}", "$run"],
                method: function(ctx, data) {
                   ctx.method = data.method;
                   ctx.path = data.path;
                }
            },
            run: {
                follow: ["{code}", "$and"],
                method: function(ctx, data) {
                   ctx.code = global.puzzle.getRawStatement(data);
                }
            },
            return: {
                follow: ["{code}", "%and"],
                method: function(ctx, data) {
                   var ret = global.puzzle.getRawStatement(data);

                   if(Object.byString(global.puzzle.vars, ret)) ctx.return = Object.byString(global.puzzle.vars, ret);
                   
                   ctx.return = ret;
                }
            },
            and: {
                follow: ["$run", "$return"],
                method: function(ctx, data) {
                   
                }
            }
        }
    }
}
module.exports = syntax;