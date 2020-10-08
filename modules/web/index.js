var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };

    const fetch = require('node-fetch');
}

var syntax = {
        context: {},
        static: {
            rootNode: 'body',
            execStatement: (done) => {

                function setAttrs(tag) {
                    var handlers = ['onclick'];
                    Object.keys(syntax.context.attrs).forEach(k => {
                        console.log(k)
                        if (handlers.includes(k)) {
                            var code = syntax.context.attrs[k] + "";
                            tag.onclick = function() {
                                eval(code)
                            }
                        } else tag[k] = syntax.context.attrs[k]
                    });
                }

                if(syntax.rootNode) syntax.static.rootNode = syntax.rootNode;

                var rootNode = document.querySelector(syntax.static.rootNode);

                var instructor = {
                    create: function(context) {

                        var tag = document.createElement(context.tagName);

                        setAttrs(tag);
                        console.log(tag)

                        if (syntax.context.tagId) tag.id = syntax.context.tagId;

                        // append
                        if (!context.insideId) {
                            rootNode.appendChild(tag); 
                        } else {
                            var innerRoot = document.getElementById(context.insideId);
                            innerRoot.appendChild(tag);
                        }
                    },
                    set: function(context) {
                        var tag = document.getElementById(context.tagId);
                        setAttrs(tag);
                    },
                    root: function(context) {
                        rootNode = document.querySelector(context.rootNode);
                    },
                    load: function(context) {
                        var tag;
                        if(syntax.context.library.includes('.css'))
                        {
                            tag = document.createElement('link');
                            tag.rel="sylesheet";
                            tag.type = "text/css";
                            tag.href=syntax.context.library;
                        }
                        document.head.appendChild(tag);
                    },
                    render: function()
                    {
                        rootNode.innerHTML = window.puzzle.getRawStatement(syntax.context.html);
                    },
                    js: function()
                    {
                        var script = document.createElement('script');
                        script.innerText = window.puzzle.getRawStatement(syntax.context.js);
                        document.body.appendChild(script)
                    },
                    css: function()
                    {
                        var style = document.createElement('style');
                        console.log(syntax.context.css, window.puzzle.getRawStatement(syntax.context.css));
                        style.innerText = window.puzzle.getRawStatement(syntax.context.css);
                        document.body.appendChild(style)
                    }
                }
                instructor[syntax.context.method](syntax.context);
                syntax.context = {};
                done();

            }
        },
        $: {
            web: {
                load: {
                    follow: ["{library}"],
                    method: function(ctx, library) {
                        syntax.context.method = 'load';
                        syntax.context.library = library;
                    }
                },
                root: {
                    follow: ["{selector}"],
                    method: function(ctx, selector) {
                        syntax.context.method = 'root';
                        syntax.context.rootNode = selector;
                    }
                },
                create: {
                    follow: ["{tagName}", "$width"],
                    method: function(ctx, tagName) {
                        syntax.context.method = 'create';
                        syntax.context.attrs = {};

                       syntax.context.tagName = tagName;
                        
                    }
                },
                get: {
                    follow: ["{tagName}", "width"],
                    method: function(ctx, tagName) {
                        syntax.context.method = 'set';
                        syntax.context.tagName = tagName;
                        syntax.context.attrs = {};
                    }
                },
                inside: {
                    follow: ["{id}", "$and"],
                    method: function(ctx, id) {
                        syntax.context.insideId = id;
                    }
                },
                width: {
                    follow: ["$id"],
                    method: function(ctx, param) {}
                },
                id: {
                    follow: ["{id}", "$and", "$set"],
                    method: function(ctx, id) {
                        syntax.context.tagId = id;
                    }
                },
                set: {
                    follow: ["$style", "$click"],
                    method: function(ctx, id) {

                    }
                },
                and: {
                    follow: ["$style", "$click", "$text", "$class"],
                    method: function(ctx, id) {
                       
                    }
                },
                text: {
                    follow: ["{text}", "$and"],
                    method: function(ctx, text) {
                        syntax.context.attrs['innerText'] = puzzle.getRawStatement(text);
                    }
                },
                style: {
                    follow: ["{style}", "$and"],
                    method: function(ctx, style) {
                        syntax.context.attrs['style'] = puzzle.getRawStatement(style);
                    }
                },
                class: {
                    follow: ["{class}", "$and"],
                        method: function(ctx, _class) {
                            syntax.context.attrs['class'] = puzzle.getRawStatement(_class);
                        }
                },
                click: {
                    follow: ["{click}", "$and"],
                    method: function(ctx, click) {
                        syntax.context.attrs['onclick'] = puzzle.getRawStatement(click);
                    }
                },
                render: {
                    follow: ["{html}"],
                    method: function(ctx, html) {
                        syntax.context.method = 'render';
                        syntax.context.html = html;

                    }
                },
                css: {
                    follow: ["{css}"],
                    method: function(ctx, css) {
                        syntax.context.method = 'css';
                        syntax.context.css = css;
                    }
                },
                js: {
                    follow: ["{js}"],
                    method: function(ctx, js) {
                        syntax.context.method = 'js';
                        syntax.context.js = js;
                    }
                }
            }
        }
    }

if (_nodejs) module.exports = syntax;