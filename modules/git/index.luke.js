var syntax = {
    context: {
        html: "",
        style: "",
        js: ""
    },
    static: {
        execStatement: function(done) {
            if(done) done();
        }
    },
    $: {
        git: {
            clone: {
                follow: ["{url}"],
                method: function(ctx, url) {
                    
                }
            },
            commit: {
                follow: ["{msg}"],
                method: function(ctx, msg) {
                }
            },
            pull: {
                follow: [],
                method: function(ctx, js) {
                }
            },
            push: {
                follow: [],
                method: function(ctx, js) {
                }
            },
        }
    }
}


module.exports = syntax;