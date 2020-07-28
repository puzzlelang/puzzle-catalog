var syntax = {
    delimeter: ";",
    assignmentOperator: "=",
    context: {
        html: "",
        style: "",
        js: ""
    },
    static: {
        execStatement: function() {
            console.log('ctx', syntax.context)
            console.log(document, document.getElementById('html-canvas'));
            
            if(document){
                if(document.getElementById('html-canvas'))
                {
                    document.getElementById('html-canvas').innerHtml = syntax.context.html;
                    document.getElementById('html-canvas').style = syntax.context.style;

                    var script = document.createElement('script');
                    var inlineCode = document.createTextNode(syntax.context.js);
                    script.appendChild(inlineCode); 

                    document.getElementById('html-canvas').appendChild(script);
                }
            }
        }
    },
    $: {
        lxhtml: {
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
                follow: ["{style}"],
                method: function(ctx, style) {
                    syntax.context.style = style;
                }
            }
        }
    }
}


module.exports = syntax;