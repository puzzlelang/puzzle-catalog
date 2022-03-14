if(global.puzzle.environment == 'node') fetch = require('node-fetch');

function call(method, url, data, callback) {

    var options = {
        method,
    };

    if (method == 'post') options.body = data;
    else if (method == 'get') url += '?' + data;
    else if (method == 'delete') options.body = data;


    fetch(url, options).then(res => res.text())
    .then(text => {
        //console.log(text)
        callback(text)
       });
}

var syntax = {
    $: {
        rest: {
            _static: {
                execStatement: function(done, ctx) {
                    if(!ctx.url) return;
                    call(ctx.method, ctx.url, ctx.payload, function(data) {
                        //global.puzzle.output(data);
                        ctx.return = data;
                        global.puzzle.vars['result'] = data;
                        done();
                    });

                }
            },
            post: {
                follow: ["{data}", "$to"],
                method: function(ctx, data) {
                    ctx.method = 'post';
                    ctx.payload = data;
                }
            },
            patch: {
                follow: ["{data}", "$to"],
                method: function(ctx, data) {
                    ctx.method = 'patch';
                    ctx.payload = data;
                }
            },
            put: {
                follow: ["{data}", "$to"],
                method: function(ctx, data) {
                    ctx.method = 'put';
                    ctx.payload = data;
                }
            },
            get: {
                follow: ["$from", "{query}"],
                method: function(ctx, query) {
                    ctx.method = 'get';
                    ctx.payload = query;
                }
            },
            delete: {
                follow: ["$from", "{query}"],
                method: function(ctx, query) {
                    ctx.method = 'delete';
                    ctx.payload = query;
                }
            },
            to: {
                follow: ["{url}"],
                method: function(ctx, url) {
                    ctx.url = url;
                }
            },
            from: {
                follow: ["{url}"],
                method: function(ctx, url) {
                    ctx.url = url;
                }
            }
        }
    }
}

if(global.puzzle.environment == 'node') module.exports = syntax;