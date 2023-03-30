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
                    keyMappings: {38: 'up', 37:'left', 40:'down', 39:'right', 13:'enter', 46:'delete', 32:'space'},
                    registeredKeyEvents: {

                    },
                    rootNode: 'body',
                    execStatement: (done, ctx) => {

                        function setAttrs(tag) {
                            Object.keys(ctx.attrs).forEach(k => {
                                if (k == 'onclick') {
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

                                if(context.tagName == "element") context.tagName = "div";
                                
                                var tag = document.createElement(context.tagName);

                                setAttrs(tag);

                                if (ctx.tagId) tag.id = ctx.tagId;

                                // append
                                if (!context.insideId) {
                                    rootNode.appendChild(tag); 
                                } else {
                                    var innerRoot = document.querySelector(context.insideId);
                                    innerRoot.appendChild(tag);
                                }

                                if(ctx.dynamicAttrs) {
                                    Object.keys(ctx.dynamicAttrs).forEach(t => {
                                        tag.style[t] = ctx.dynamicAttrs[t]
                                    })
                                }
                                done();
                            },
                            set: function(context) {
                                var tag = document.getElementById(context.tagId);
                                setAttrs(tag);
                                if(ctx.dynamicAttrs) {
                                    Object.keys(ctx.dynamicAttrs).forEach(t => {
                                        tag.style[t] = ctx.dynamicAttrs[t]
                                    })
                                }
                                done();
                            },
                            root: function(context) {
                                rootNode = document.querySelector(context.rootNode);
                                done();
                            },
                            load: function(context) {
                                if(context.library.includes('.css'))
                                {
                                    if(context.library.includes('http://') || context.library.includes('https://')){
                                        fetch(context.library).then(response => response.text()).then(response => {
                                            var tag;
                                            tag = document.createElement('link');
                                            tag.rel = 'stylesheet';
                                            tag.innerText = response;
                                            document.head.appendChild(tag);
                                            done();
                                        })
                                        .catch(error => {
                                            // handle the error...
                                        });
                                        return
                                    }
                                    var tag;
                                    tag = document.createElement('link');
                                    tag.rel = 'stylesheet';
                                    tag.href = context.library;
                                    document.head.appendChild(tag);
                                    done();
                                } else if(context.library.includes('.js')){
                                    var tag;
                                    tag=document.createElement('script')
                                    tag.setAttribute("type","text/javascript")
                                    tag.setAttribute("src", context.library);
                                    document.getElementsByTagName("head")[0].appendChild(tag);
                                    done();
                                } 
                            },
                            render: function(context)
                            {
                                var element = document.createElement('div');
                                element.innerHTML = window.puzzle.getRawStatement(ctx.html);
                                
                                if(context.insideId) {
                                    var innerRoot = document.querySelector(context.insideId);
                                    innerRoot.appendChild(element);
                                } else rootNode.appendChild(element); 
                                done();
                            },
                            js: function(context)
                            {
                                var script = document.createElement('script');
                                script.innerText = window.puzzle.getRawStatement(ctx.js);
                                document.head.appendChild(script);
                                done();
                            },
                            css: function(context)
                            {
                                var style = document.createElement('style');
                                style.innerText = window.puzzle.getRawStatement(ctx.css);
                                document.body.appendChild(style)
                                done();
                            }
                        }
                        if(!ctx.method) return done();
                        instructor[ctx.method](ctx);
                        ctx = {};
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
                get: {
                    follow: ["{id}", "$and"],
                    method: function(ctx, id) {
                        ctx.method = 'set';
                        ctx.tagId = id;
                        ctx.attrs = {};
                        ctx.return = document.getElementById(id);
                    }
                },
                inside: {
                    follow: ["{id}", "$and"],
                    method: function(ctx, id) {
                        ctx.insideId = id;
                    }
                },
                with: {
                    follow: ["$style", "$click", "$text", "$class", "$id", "{key,value}"],
                    method: function(ctx, data) {
                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value);
                        } 
                    }
                },
                move: {
                    follow: ["{direction,unit}"],
                    method: function(ctx, data) {
                        if(ctx.tagId){
                            var currentLeft = document.getElementById(ctx.tagId).style.left.replace('px','');
                            var currentRight = document.getElementById(ctx.tagId).style.right.replace('px','');
                            var currentTop = document.getElementById(ctx.tagId).style.top.replace('px','');
                            var currentBottom = document.getElementById(ctx.tagId).style.bottom.replace('px','');

                            if(data.direction == 'right') 
                                document.getElementById(ctx.tagId).style.left = parseInt(currentLeft) + parseInt(data.unit.replace('px','')) + 'px';
                            if(data.direction == 'left') 
                                document.getElementById(ctx.tagId).style.left = parseInt(currentLeft) - parseInt(data.unit.replace('px','')) + 'px';
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
                    follow: ["$style", "$click", "$text", "$class", "$id", "$background", "{key,value}"],
                    method: function(ctx, data) {

                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value);
                        } 
                    }
                },
                background: {
                  follow: ["{value}"],
                  method: function (ctx, param) {
                    document.body.style.background = param;
                  }
                },
                and: {
                    follow: ["$style", "$click", "$text", "$class", "$set", "$id", "$move", "{key,value}"],
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
                html: {
                    follow: ["{html}", "$and"],
                    method: function(ctx, html) {
                        ctx.attrs['innerHTML'] = puzzle.getRawStatement(html);
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
                    follow: ["{tagName}", "$with"],
                    method: function(ctx, tagName) {
                        if(window.puzzle.groupingOperators.includes(tagName.charAt(0))){
                            ctx.method = 'render';
                            ctx.html = tagName;
                            return;
                        } 
                        ctx.method = 'create';
                        ctx.attrs = {};
                        ctx.tagName = tagName;
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
                        alert(window.puzzle.evaluateRawStatement(message))
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
                    method: function(ctx, message) {
                        
                    }
                },
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
            }
    }

if (_nodejs) module.exports = syntax;