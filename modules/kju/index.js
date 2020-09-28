var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };

    const fetch = require('node-fetch');
}

const KJU_URL = "https://europe-west3-spoocloud-202009.cloudfunctions.net/kju-dummy/api";
var KJU_CREATION_TOKEN = "";

var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    static: {
        execStatement: function(done) {
            console.log('executing...');
            console.log('ctx', syntax.context);

            if (syntax.context.messageCreationData) {

                fetch(KJU_URL + '/message?token=' + KJU_CREATION_TOKEN, {
                        method: 'post',
                        body: syntax.context.messageCreationData,
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then(res => res.json())
                    .then(json => {
                        console.log('done (raw)', json)
                        done();
                    });

            } else {

                fetch(KJU_URL + '/message?token=' + KJU_CREATION_TOKEN, {
                        method: 'post',
                        body: {
                            content: global.puzzle.getRawStatement(syntax.context.content),
                            responses: JSON.parse(global.puzzle.getRawStatement(syntax.context.responses))
                        },
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then(res => res.json())
                    .then(json => {
                        console.log('ööö', json)
                        done();
                    });
            }
        }
    },
    $: {
        rest: {
            create: {
                follow: ["$message", "$token"],
                method: function(ctx, data) {
                    syntax.context.method = 'create';
                }
            },
            and: {
                follow: ["$and", "$message", "$content", "$responses"],
                method: function(ctx) {

                }
            },
            with: {
                follow: ["$content", "$responses"],
                method: function(ctx) {

                }
            },
            content: {
                follow: ["{data}", "$and", "$message"],
                method: function(ctx, data) {
                    syntax.context.content = data;
                }
            },
            responses: {
                follow: ["{data}", "$and", "$message"],
                method: function(ctx, data) {
                    syntax.context.responses = data;
                }
            },
            message: {
                follow: ["{data}", "$with"],
                method: function(ctx, data) {
                    if(data) syntax.context.messageCreationData = data;
                }
            },
            token: {
                follow: ["{data}"],
                method: function(ctx, data) {

                    fetch(KJU_URL + '/creationToken', {
                            method: 'post',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        .then(res => res.json())
                        .then(json => {
                            console.log(json);
                            KJU_CREATION_TOKEN = json.data;
                        });
                }
            },
        }
    }
}
module.exports = syntax;