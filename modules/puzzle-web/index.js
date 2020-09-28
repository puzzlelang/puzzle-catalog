var isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};

var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {
        html: "",
        style: "",
        js: ""
    },
    static: {
        execStatement: function(done) {

            if (lxhtmlBus) {

                var data = {};

                if (syntax.context.html) data.html = syntax.context.html.substring(1, syntax.context.html.length - 1);
                if (syntax.context.style) data.style = syntax.context.style.substring(1, syntax.context.style.length - 1);
                if (syntax.context.js) data.js = syntax.context.js.substring(1, syntax.context.js.length - 1);

                lxhtmlBus.$emit('custom-content', data)

            } else global.puzzle.output('lx-html can not be run in this environment')

            done();
        }
    },
    $: {
        'lx-html': {
            render: {
                follow: ["{html}"],
                method: function(ctx, html) {
                    syntax.context.html = html;

                }
            },
            style: {
                follow: ["{style}"],
                method: function(ctx, style) {
                    syntax.context.style = style;
                }
            },
            js: {
                follow: ["{js}"],
                method: function(ctx, js) {
                    syntax.context.js = js;
                }
            },
            lx_autorun: {
                follow: [],
                method: function(ctx, js) {
                    // void
                }
            },
        }
    }
}


module.exports = syntax;