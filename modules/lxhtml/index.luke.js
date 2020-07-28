var syntax = {
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
        lxhtml: {
            render: {
                follow: ["{html}"],
                method: function(ctx, html) {
                    console.log('html', html);
                }
            }
        }
    }
}


module.exports = syntax;