const https = require('https');

function call(method, url, data, callback) {
    https[method.toLowerCase()](url, (resp) => {
        var data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            useSyntax(lang, eval(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

var lang = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    $: {
        rest: {
            POST: {
                follow: ["{data}", "$to"],
                method: function(data) {
                    lang.context.method = 'post';
                    lang.context.payload = data;
                    console.log('data', data);
                }
            },
            PATCH: {
                follow: ["{data}", "$to"],
                method: function(data) {
                    lang.context.method = 'patch';
                    lang.context.payload = data;
                    console.log('data', data);
                }
            },
            PUT: {
                follow: ["{data}", "$to"],
                method: function(data) {
                    lang.context.method = 'put';
                    lang.context.payload = data;
                    console.log('data', data);
                }
            },
            GET: {
                follow: ["{query}", "$from"],
                method: function(query) {
                    lang.context.method = 'get';
                    lang.context.payload = query;
                    console.log('query', query);
                }
            },
            to: {
                follow: ["{url}"],
                method: function(url) {

                    call(lang.context.method, url, lang.context.payload, function(data) {
                        console.log(data);
                    });

                }
            },
            from: {
                follow: ["{url}"],
                method: function(url) {
                    call(lang.context.method, url, lang.context.payload, function(data) {
                        console.log(data);
                    });
                }
            }
        }
    }
}
module.exports = lang;