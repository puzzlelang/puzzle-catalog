var OBJY = require('objy.js')

var lang = {
    $: {
        objy: {
            define: {
                follow: ["$objectFamily"],
                method: function(ctx) {
                    console.log('define');
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(ctx, p) {
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
                method: function(ctx, p) {
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