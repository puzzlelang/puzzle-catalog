var OBJY = require('objy.js')

var syntax = {
    $: {
        objy: {
            define: {
                follow: ["$objectFamily"],
                method: function(ctx) {
                    global.luke.output('define');
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
                    global.luke.output('add(' + p + ')');
                }
            },
            obj: {
                follow: ["$set"],
                method: function(ctx) {

                }
            },
            objectFamily: {
                follow: ["$set", "$width", "${ofName}", "{name}"],
                method: function(ctx, p) {
                    global.luke.output('objectFamily(' + p + ')');
                }
            },
            set: {
                follow: ["{name}", "$set", "$and", "$with", "$exec"],
                method: function(ctx,r) {
                    //console.log(r);
                    global.luke.outputglobal.luke.output('set(' + r + ')');
                }
            },
            "width": {
                follow: ["{name}", "$and"],
                method: function(ctx,p) {
                    global.luke.output('width(' + p + ')');
                }
            },
            and: {
                follow: ["$set", "$width", "{sf}"],
                method: function(ctx,p) {
                    global.luke.output('and', p);
                }
            }
        }
    }
}
module.exports = syntax;