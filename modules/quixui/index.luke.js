var lang = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {},
    static: {
        execStatement: function() {}
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
                follow: ["{credentials}"],
                method: function(ctx, cr) {
                    lang.context['credentials'] = cr;
                    console.log(cr)
                }
            }
        }
    }
}


module.exports = lang;