var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };
}

        var syntax = {
            ui: {
                _static: {
                    keyMappings: {38: 'up', 37:'left', 39:'down', 40:'right', 13:'enter', 46:'delete', 32:'space'},
                    registeredKeyEvents: {

                    },
                    rootNode: 'body',
                    execStatement: (done, ctx) => {

                        function setAttrs(tag) {
                            var handlers = ['onclick'];
                            Object.keys(ctx.attrs).forEach(k => {
                                if (handlers.includes(k)) {
                                    var code = ctx.attrs[k] + "";
                                    tag.onclick = function() {
                                        //eval(code)
                                        window.puzzle.parse(code)
                                    }
                                } else tag[k] = ctx.attrs[k]
                            });
                        }
                        
                        var rootNode = document.querySelector(syntax.ui._static.rootNode);

                        var instructor = {
                            create: function(context) {

                                var tag = document.createElement(context.tagName);

                                setAttrs(tag);

                                if (ctx.tagId) tag.id = ctx.tagId;

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
                                if(ctx.library.includes('.css'))
                                {
                                    tag = document.createElement('link');
                                    tag.rel="sylesheet";
                                    tag.type = "text/css";
                                    tag.href=ctx.library;
                                }
                                document.head.appendChild(tag);
                            },
                            render: function()
                            {
                                rootNode.innerHTML = window.puzzle.getRawStatement(ctx.html);
                            },
                            js: function()
                            {
                                var script = document.createElement('script');
                                script.innerText = window.puzzle.getRawStatement(ctx.js);
                                document.body.appendChild(script)
                            },
                            css: function()
                            {
                                var style = document.createElement('style');
                                console.log(ctx.css, window.puzzle.getRawStatement(ctx.css));
                                style.innerText = window.puzzle.getRawStatement(ctx.css);
                                document.body.appendChild(style)
                            }
                        }
                        instructor[ctx.method](ctx);
                        ctx = {};
                        done();

                    }
                },
                load: {
                    follow: ["{library}"],
                    method: function(ctx, library) {
                        ctx.method = 'load';
                        ctx.library = library;
                    }
                },
                root: {
                    follow: ["{selector}"],
                    method: function(ctx, selector) {
                        ctx.method = 'root';
                        ctx.rootNode = window.puzzle.getRawStatement(selector);
                        syntax.ui._static.rootNode = window.puzzle.getRawStatement(selector);
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
                        ctx.method = 'create';
                        ctx.attrs = {};
                        ctx.tagName = tagName;
                    }
                },
                get: {
                    follow: ["{tagName}", "with"],
                    method: function(ctx, tagName) {
                        ctx.method = 'set';
                        ctx.tagName = tagName;
                        ctx.attrs = {};
                    }
                },
                inside: {
                    follow: ["{id}", "$and"],
                    method: function(ctx, id) {
                        ctx.insideId = id;
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
                        ctx.tagId = id;
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
                        ctx.attrs['innerText'] = puzzle.getRawStatement(text);
                    }
                },
                style: {
                    follow: ["{style}", "$and"],
                    method: function(ctx, style) {
                        ctx.attrs['style'] = puzzle.getRawStatement(style);
                    }
                },
                class: {
                    follow: ["{class}", "$and"],
                        method: function(ctx, _class) {
                            ctx.attrs['className'] = puzzle.getRawStatement(_class);
                        }
                },
                click: {
                    follow: ["{click}", "$and"],
                    method: function(ctx, click) {
                        ctx.attrs['onclick'] = puzzle.getRawStatement(click);
                    }
                },
                render: {
                    follow: ["{html}"],
                    method: function(ctx, html) {
                        ctx.method = 'render';
                        ctx.html = html;

                    }
                },
                css: {
                    follow: ["{css}"],
                    method: function(ctx, css) {
                        ctx.method = 'css';
                        ctx.css = css;
                    }
                },
                js: {
                    follow: ["{js}"],
                    method: function(ctx, js) {
                        ctx.method = 'js';
                        ctx.js = js;
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

                                Object.keys(syntax.ui._static.keyMappings).forEach(_m => {
                                    if(syntax.ui._static.keyMappings[_m] == data.type){
                                        keyCode = _m;
                                    }
                                })

                                syntax.ui._static.registeredKeyEvents[keyCode] = window.puzzle.getRawStatement(data.code)

                                document.onkeydown = function(e) {
                                    if(syntax.ui._static.registeredKeyEvents[e.keyCode]){
                                        window.puzzle.parse(syntax.ui._static.registeredKeyEvents[e.keyCode])
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
