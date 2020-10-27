var OBJY = require('objy.js')

var syntax = {
    context: {},
    static: {
        execStatement: (done, ctx) => {
            if (ctx.email) {
                var mail = {
                    from: (global.puzzle.getRawStatement(ctx.emailFrom) || '') + ' <noreply@spoo.rocks>',
                    to: global.puzzle.getRawStatement(ctx.emailTo),
                    subject: global.puzzle.getRawStatement(ctx.emailSubject),
                    text: global.puzzle.getRawStatement(ctx.emailContent)
                }
                console.log('sending mail:', mail);

                sgMail.send(mail);
            }

            if (ctx.method == 'process') {

                var singleRole = ctx.role.substring(0, ctx.role.length - 1);

                function doPage(page) {

                    if (!page) page = 1;

                    var data = eval('(' + ctx.data + ')')
                    data.$page = page;
                    OBJY[ctx.role](data)['get'](data => {

                        console.log(data);

                        if (ctx.alterData) {
                            data.forEach(d => {

                                var obj = OBJY[singleRole](d)

                                Object.keys(ctx.alterData).forEach(k => {
                                    if (Array.isArray(ctx.alterData[k])) {
                                        console.log(k, ctx.alterData[k]);
                                        obj[k](...ctx.alterData[k]);
                                    } else {
                                        obj[k](ctx.alterData[k]);
                                    }
                                })

                                obj.update()
                            })
                        }

                        if (data.length == 20)
                            doPage(++page);

                    }, err => {
                        console.error(err)
                    })
                }

                doPage(1);

            } else if (ctx.method == 'update') {


                var data = eval('(' + ctx.data + ')')

                OBJY[ctx.role](data)['get'](data => {

                    console.log(data);

                    if (ctx.alterData) {

                        var obj = OBJY[ctx.role](data)

                        Object.keys(ctx.alterData).forEach(k => {
                            if (Array.isArray(ctx.alterData[k])) {
                                obj[k](...ctx.alterData[k]);
                            } else {
                                obj[k](ctx.alterData[k]);
                            }
                        })

                        obj.update()

                    }

                    if (data.length == 20)
                        doPage(++page);

                }, err => {
                    console.error(err)
                })



            } else {
                if (ctx.method) {
                    var data = eval('(' + ctx.data + ')')
                    OBJY[ctx.role](data)[ctx.method](data => {
                        console.log(data)
                    }, err => {
                        console.error(err)
                    })
                }
            }
            ctx = {};
            done();
        }
    },
    $: {
        'objy': {
            "{data}": {
                follow: ["${data}", "width", "$and"],
                method: function(ctx, role) {
                    ctx.method = 'add';
                    ctx.role = role;
                }
            },
            add: {
                follow: ["{role}", "width", "$and"],
                method: function(ctx, role) {
                    ctx.method = 'add';
                    ctx.role = role;
                }
            },
            get: {
                follow: ["{role}", "width"],
                method: function(ctx, role) {
                    ctx.method = 'get';
                    ctx.role = role;
                }
            },
            set: {
                follow: ["{key,value}", "$and"],
                method: function(ctx, data) {
                    if (!ctx.setData) ctx.setData = {};
                    ctx.setData[data.key] = data.value
                }
            },
            process: {
                follow: ["{role}", "width"],
                method: function(ctx, role) {
                    ctx.method = 'process';
                    ctx.role = role;
                }
            },
            update: {
                follow: ["{role}", "width", "$set", "$add", "$remove"],
                method: function(ctx, role) {
                    ctx.method = 'update';
                    ctx.role = role;
                }
            },
            width: {
                follow: ["{data}", "$alter"],
                method: function(ctx, data) {
                    ctx.data = data;
                }
            },
            alter: {
                follow: ["{updateObj}"],
                method: function(ctx, updateObj) {
                    ctx.alterData = eval('(' + updateObj + ')');
                    console.log('alter', ctx.alterData)
                }
            },
            and: {
                follow: ["$set", "$add"],
                method: function(ctx, data) {

                }
            },
            email: {
                follow: ["$from", "$to"],
                method: function(ctx, data) {
                    ctx.email = true;
                }
            },
            from: {
                follow: ["$to", "$subject", "{data}"],
                method: function(ctx, data) {
                    ctx.emailFrom = data;
                }
            },
            to: {
                follow: ["$subject", "$from", "{data}"],
                method: function(ctx, data) {
                    ctx.emailTo = data;
                }
            },
            subject: {
                follow: ["$content", "{data}"],
                method: function(ctx, data) {
                    ctx.emailSubject = data;
                }
            },
            content: {
                follow: ["{data}"],
                method: function(ctx, data) {
                    ctx.emailContent = data;
                }
            }
        }
    }
}
module.exports = syntax;