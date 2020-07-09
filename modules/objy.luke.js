module.exports = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    $: {
        objy: {
            define: {
                follow: ["$objectFamily"],
                method: function() {
                    console.log('define');
                }
            },
            add: {
                follow: ["{name}", "$width"],
                method: function(p) {
                    console.log('add(' + p + ')');
                }
            },
            obj: {
                follow: ["$set"],
                method: function() {

                }
            },
            objectFamily: {
                follow: ["$set", "$width", "${ofName}", "{name}"],
                method: function(p) {
                    console.log('objectFamily(' + p + ')');
                }
            },
            set: {
                follow: ["{name}", "$set", "$and", "$with", "$exec"],
                method: function(r) {
                    //console.log(r);
                    console.log('set(' + r + ')');
                }
            },
            "width": {
                follow: ["{name}", "$and"],
                method: function(p) {
                    console.log('width(' + p + ')');
                }
            },
            and: {
                follow: ["$set", "$width", "{sf}"],
                method: function(p) {
                    console.log('and', p);
                }
            }
        }
    }
}