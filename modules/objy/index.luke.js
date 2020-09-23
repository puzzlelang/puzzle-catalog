var OBJY = require('objy.js')

var syntax = {
    $: {
        objy: {
            define: {
                follow: ["$objectFamily"],
                method: function(ctx) {
                    global.puzzle.output('define');
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
                    global.puzzle.output('add(' + p + ')');
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
                    global.puzzle.output('objectFamily(' + p + ')');
                }
            },
            set: {
                follow: ["{name}", "$set", "$and", "$with", "$exec"],
                method: function(ctx,r) {
                    //console.log(r);
                    global.puzzle.outputglobal.puzzle.output('set(' + r + ')');
                }
            },
            "width": {
                follow: ["{name}", "$and"],
                method: function(ctx,p) {
                    global.puzzle.output('width(' + p + ')');
                }
            },
            and: {
                follow: ["$set", "$width", "{sf}"],
                method: function(ctx,p) {
                    global.puzzle.output('and', p);
                }
            }
        }
    }
}
module.exports = syntax;