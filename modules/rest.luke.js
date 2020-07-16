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
                }
            },
            PATCH: {
                follow: ["{data}", "$to"],
                method: function(data) {
                    lang.context.method = 'patch';
                    lang.context.payload = data;
                }
            },
            PUT: {
                follow: ["{data}", "$to"],
                method: function(data) {
                    lang.context.method = 'put';
                    lang.context.payload = data;
                }
            },
            GET: {
                follow: ["$from", "{query}"],
                method: function(query) {
                    lang.context.method = 'get';
                    lang.context.payload = query;
                }
            },
            DELETE: {
                follow: ["$from", "{query}"],
                method: function(query) {
                    lang.context.method = 'delete';
                    lang.context.payload = query;
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