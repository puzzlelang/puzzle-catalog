const Koa = require('koa');
const router = require('@koa/router')();
const app = new Koa();

var syntax = {

        server: {
            _static: {
                 execStatement: (done, ctx) => {

                    if(ctx.method){
                        router[ctx.method](ctx.path, _ctx => {
                            if(ctx.code) global.puzzle.parse(ctx.code)

                            var _return = global.puzzle.getRawStatement(ctx.return);

                            if(Object.byString(global.puzzle.vars, _return)) _ctx.body = Object.byString(global.puzzle.vars, _return);
                            else _ctx.body = ctx.return;
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
                follow: ["{method,path}", "$run", "$return"],
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
                   var ret = data;
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
module.exports = syntax;