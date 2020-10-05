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
                    if (handlers.includes(k)) {
                        var code = syntax.context.attrs[k] + "";
                        tag.onclick = function() {
                            eval(code)
                        }
                    } else tag[k] = syntax.context.attrs[k]
                });
            }

            var rootNode = document.querySelector(syntax.static.rootNode);
            var instructor = {
                create: function(context) {

                    var tag = document.createElement(context.tagName);

                    setAttrs(tag);

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
                    syntax.static.rootNode = document.querySelector(context.rootNode);
                }
            }
            instructor[syntax.context.method](syntax.context);
            syntax.context = {};
            done();
        }
    },
    $: {
        web: {
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
                    syntax.context.tagName = tagName;
                    syntax.context.attrs = {};
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
                follow: ["$style", "$click", "$text"],
                method: function(ctx, id) {}
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
            }
        }
    }
}

if (_nodejs) module.exports = syntax;