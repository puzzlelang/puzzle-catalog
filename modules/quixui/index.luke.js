var lang = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {
        attrs: {}
    },
    static: {
        execStatement: function() {
            console.log('ctx', this.context)
        }
    },
    $: {
        quixui: {
            create: {
                follow: ["{element}", "$with"],
                method: function(ctx, el) {
                    lang.context['element'] = el;
                    console.log('using', el)
                }
            },
            with: {
                follow: ["{key,value}", "$and"],
                method: function(ctx, data) {
                    lang.context.attrs[data.key] = data.value;
                }
            },
            and: {
                follow: ["{key,value}", "$and"],
                method: function(ctx, cr) {
                    lang.context.attrs[data.key] = data.value;
                }
            }
        }
    }
}


module.exports = lang;