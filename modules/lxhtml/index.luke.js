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
            
            console.log(lxhtmlBus);
            if(lxhtmlBus){

                lxhtmlBus.$emit('custom-content', {
                    html: syntax.context.html.substring(1, syntax.context.html.length-1),
                    style: syntax.context.style.substring(1, syntax.context.style.length-1),
                    js: syntax.context.js.substring(1, syntax.context.js.length-1)
                })

            } 

           /* if(document){
                if(document.getElementById('html-canvas')) {
                    document.getElementById('html-canvas').innerHtml = syntax.context.html.substring(1, syntax.context.html.length-1)
                    document.getElementById('html-canvas').style = syntax.context.style.substring(1, syntax.context.style.length-1)

                    var script = document.createElement('script');
                    var inlineCode = document.createTextNode(syntax.context.js.substring(1, syntax.context.js.length-1));
                    script.appendChild(inlineCode); 

                    document.getElementById('html-canvas').appendChild(script);
                }
            }*/
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