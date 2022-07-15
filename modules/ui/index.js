var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };
}

        var syntax = {
        context: {},
        
            ui: {
                _static: {
                    keyMappings: {38: 'up', 37:'left', 39:'down', 40:'right', 13:'enter', 46:'delete', 32:'space'},
                    registeredKeyEvents: {

                    },
                    rootNode: 'body',
                    execStatement: (done, ctx) => {

                        function setAttrs(tag) {
                            var handlers = ['onclick'];
                            Object.keys(syntax.context.attrs).forEach(k => {
                                if (handlers.includes(k)) {
                                    var code = syntax.context.attrs[k] + "";
                                    tag.onclick = function() {
                                        //eval(code)
                                        window.puzzle.parse(code)
                                    }
                                } else tag[k] = syntax.context.attrs[k]
                            });
                        }
                        
                        var rootNode = document.querySelector(syntax.$.ui._static.rootNode);

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

                                if(ctx.dynamicAttrs) {
                                    Object.keys(ctx.dynamicAttrs).forEach(t => {
                                        tag.style[t] = ctx.dynamicAttrs[t]
                                    })
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
                        syntax.context.rootNode = window.puzzle.getRawStatement(selector);
                        syntax.$.ui._static.rootNode = window.puzzle.getRawStatement(selector);
                    }
                },
                define: {
                    follow: ["{type,name,value}"],
                    method: function(ctx, data) {

                        if(data.type == 'class'){

                            var tag = document.createElement('style');
                            tag.type = 'text/css';
                            tag.innerHTML = '.'+data.name+ ' {';

                            tag.innerHTML += window.puzzle.getRawStatement(data.value)

                            tag.innerHTML += '}';

                            document.getElementsByTagName('head')[0].appendChild(tag);

                        }

                    }
                },
                create: {
                    follow: ["{tagName}", "$with"],
                    method: function(ctx, tagName) {
                        syntax.context.method = 'create';
                        syntax.context.attrs = {};
                        syntax.context.tagName = tagName;
                    }
                },
                get: {
                    follow: ["{tagName}", "with"],
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
                with: {
                    follow: ["$id", "{key,value}"],
                    method: function(ctx, data) {
                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value);
                        } 
                    }
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
                    follow: ["$style", "$click", "$text", "$class", "{key,value}"],
                    method: function(ctx, data) {
                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value);
                        } 
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
                            syntax.context.attrs['className'] = puzzle.getRawStatement(_class);
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
                },
                alert: {
                    follow: ["{message}"],
                    method: function(ctx, message) {
                        alert(message)
                    }
                },
                confirm: {
                    follow: ["{message}"],
                    method: function(ctx, message) {
                        ctx.return = confirm(message)
                    }
                },
                prompt: {
                    follow: ["{message}"],
                    method: function(ctx, message) {
                        ctx.return = prompt(message)
                    }
                },
                on: {
                    follow: ["$key"],
                    innerSequence: {
                        key: {
                            follow: ["{type,code}"],
                            method: function(ctx, data) {
                                
                                var keyCode;

                                Object.keys(syntax.$.ui._static.keyMappings).forEach(_m => {
                                    if(syntax.$.ui._static.keyMappings[_m] == data.type){
                                        keyCode = _m;
                                    }
                                })

                                syntax.$.ui._static.registeredKeyEvents[keyCode] = window.puzzle.getRawStatement(data.code)

                                document.onkeydown = function(e) {
                                    if(syntax.$.ui._static.registeredKeyEvents[e.keyCode]){
                                        window.puzzle.parse(syntax.$.ui._static.registeredKeyEvents[e.keyCode])
                                    }
                                };
                            }
                        }
                    },
                    method: function(ctx, message) {
                        
                    }
                }
            }
    }

if (_nodejs) module.exports = syntax;