const request = require('request');

function call(method, url, data, callback) {

    var options = {
        method,
        uri: url,
    };

    if (method == 'post') options.postData = data;
    else if (method == 'get') options.uri += '?' + data;
    else if (method == 'delete') options.postData = data;

    request(options, function(error, response, body) {
        if (callback) callback(body)
    })
}

var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    $: {
        rest: {
            POST: {
                follow: ["{data}", "$to"],
                method: function(ctx,data) {
                    syntax.context.method = 'post';
                    syntax.context.payload = data;
                }
            },
            PATCH: {
                follow: ["{data}", "$to"],
                method: function(ctx,data) {
                    syntax.context.method = 'patch';
                    syntax.context.payload = data;
                }
            },
            PUT: {
                follow: ["{data}", "$to"],
                method: function(ctx,data) {
                    syntax.context.method = 'put';
                    syntax.context.payload = data;
                }
            },
            GET: {
                follow: ["$from", "{query}"],
                method: function(ctx,query) {
                    syntax.context.method = 'get';
                    syntax.context.payload = query;
                }
            },
            DELETE: {
                follow: ["$from", "{query}"],
                method: function(ctx,query) {
                    syntax.context.method = 'delete';
                    syntax.context.payload = query;
                }
            },
            to: {
                follow: ["{url}"],
                method: function(ctx,url) {
                    call(syntax.context.method, url, syntax.context.payload, function(data) {
                        console.log(data);
                    });

                }
            },
            from: {
                follow: ["{url}"],
                method: function(ctx,url) {
                    call(syntax.context.method, url, syntax.context.payload, function(data) {
                        console.log(data);
                    });
                }
            }
        }
    }
}
module.exports = syntax;