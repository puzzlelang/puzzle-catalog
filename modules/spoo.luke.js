var SPOO = require('./dependencies/spooclient.js');

var spoo = new SPOO();


var lang = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    $: {
        spoo: {
            set: {
                follow: ["$client", "$url", "$app"],
                method: function(ws) {}
            },
            client: {
                follow: ["{client}"],
                method: function(client) {
                    lang.context['client'] = client;
                    spoo = new SPOO(client);
                    console.log('using client', client)
                }
            },
            app: {
                follow: ["{app}"],
                method: function(app) {
                    lang.context['app'] = app;
                    spoo = new SPOO(lang.context['client']).AppId(app);
                    console.log('using app', app)
                }
            },
            auth: {
                follow: ["$username"],
                method: function(username) {

                }
            },
            username: {
                follow: ["{username}", "$password"],
                method: function(username) {
                    lang.context['username'] = username;
                }
            },
            password: {
                follow: ["{pass}"],
                method: function(pass) {
                    spoo.io().auth(lang.context['username'], pass, function(data, err) {

                    }, true)
                }
            },
            get: {
                follow: ["{objectfamily,query}", "$app"],
                method: function(args) {
                    console.log('args', arguments);
                    spoo.io()[args.objectfamily](args.query).get(function(data, err) {
                        console.log(err, data)
                    })
                }
            },
            add: {
                follow: ["{objectFamily}"],
                method: function(objectfamily) {
                    spoo.io()[objectfamily]({}).add(function(data, err) {
                        console.log(err, data)
                    })
                }
            }
        }
    }
}


module.exports = lang;