var SPOO = require('./spooclient.js');

var spoo = new SPOO();

var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {
        qBody: {}
    },
    static: {
        execStatement: function(done) {
            console.log('exec statement');

            if (syntax.context.objectFamily) {

                console.log(syntax.context.qBody);

                var body = syntax.context.qBody;

                if (syntax.context.qBody.id) {
                    body = syntax.context.qBody.id;
                }

                spoo.io()[syntax.context.objectFamily](body)[syntax.context.method](function(data, err) {
                    if (err) return console.log(err);
                    console.log(data);
                    if (done) done();
                })
            } else if (done) done();
        }
    },
    $: {
        spoo: {
            client: {
                follow: ["{workspace}"],
                method: function(ctx, ws) {
                    syntax.context.ws = ws;
                    spoo = new SPOO(ws);
                }
            },
            app: {
                follow: ["{app}"],
                method: function(ctx, app) {
                    syntax.context.app = app;
                    spoo = new SPOO(syntax.context.ws).AppId(app);
                }
            },
            auth: {
                follow: ["{username,password}"],
                method: function(ctx, cr) {
                    syntax.context['credentials'] = cr;
                    spoo.io().auth(cr.username, cr.password, function(data, err) {
                        if (err) return console.log('Authentication failed ', err);
                        console.log('Authenticated', data);
                        syntax.static.execStatement();
                    }, true)
                }
            },
            from: {
                follow: ["{url}"],
                method: function(ctx, url) {
                    syntax.context['importUrl'] = url;
                    console.log(url)
                }
            },
            define: { 
                follow: ["$objectFamily"],
                method: function(ctx) {
                    console.log('define');
                }
            },

            // crud
            get: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
                    syntax.context.objectFamily = p;
                    syntax.context.method = 'get';
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
                    syntax.context.objectFamily = p;
                    syntax.context.method = 'add';
                }
            },
            delete: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
                    syntax.context.objectFamily = p;
                    syntax.context.method = 'delete';
                }
            },


            objectFamily: {
                follow: ["$set", "$width", "${ofName}", "{name}"],
                method: function(ctx, p) {
                    console.log('objectFamily(' + p + ')');
                }
            },
            set: {
                follow: ["{name}", "$set", "$and", "$with", "$exec"],
                method: function(ctx, r) {
                    //console.log(r);
                    console.log('set(' + r + ')');
                }
            },
            "width": {
                follow: ["{key,value}", "$and"],
                method: function(ctx, p) {
                    console.log('width', p);
                    syntax.context.qBody[p.key] = p.value
                }
            },
            and: {
                follow: ["$set", "$width", "{sf}"],
                method: function(ctx, p) {
                    console.log('and', p);
                }
            }
        }
    }
}


module.exports = syntax;