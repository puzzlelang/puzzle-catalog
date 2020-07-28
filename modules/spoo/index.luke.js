var SPOO = require('../dependencies/spooclient.js');

var spoo = new SPOO();


var lang = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    $: {
        spoo: {
            client: {
                follow: ["{workspace}", "$from"],
                method: function(ctx,ws) {
                    lang.context['workspace'] = ws;
                    console.log('using', ws)
                }
            },
            auth: {
                follow: ["{credentials}"],
                method: function(ctx,cr) {
                    lang.context['credentials'] = cr;
                    console.log(cr)
                }
            },
            from: {
                follow: ["{url}"],
                method: function(ctx,url) {
                    lang.context['importUrl'] = url;
                    console.log(url)
                }
            },
            define: {
                follow: ["$objectFamily"],
                method: function(ctx) {
                    console.log('define');
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(ctx,p) {
                    console.log('add(' + p + ')');
                }
            },
            obj: {
                follow: ["$set"],
                method: function(ctx) {

                }
            },
            objectFamily: {
                follow: ["$set", "$width", "${ofName}", "{name}"],
                method: function(ctx,p) {
                    console.log('objectFamily(' + p + ')');
                }
            },
            set: {
                follow: ["{name}", "$set", "$and", "$with", "$exec"],
                method: function(ctx,r) {
                    //console.log(r);
                    console.log('set(' + r + ')');
                }
            },
            "width": {
                follow: ["{name}", "$and"],
                method: function(ctx,p) {
                    console.log('width(' + p + ')');
                }
            },
            and: {
                follow: ["$set", "$width", "{sf}"],
                method: function(ctx,p) {
                    console.log('and', p);
                }
            }
        }
    }
}


module.exports = lang;