var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {
        attrs: {}
    },
    static: {
        execStatement: function(done) {
            global.luke.output;
            if(done) done();
        }
    },
    $: {
        quixui: {
            create: {
                follow: ["{element}", "$with"],
                method: function(ctx, el) {
                    syntax.context['element'] = el;
                    global.luke.output('using', el)
                }
            },
            with: {
                follow: ["{key,value}", "$and"],
                method: function(ctx, data) {
                    syntax.context.attrs[data.key] = data.value;
                }
            },
            and: {
                follow: ["{key,value}", "$and"],
                method: function(ctx, cr) {
                    syntax.context.attrs[data.key] = data.value;
                }
            }
        }
    }
}


module.exports = syntax;