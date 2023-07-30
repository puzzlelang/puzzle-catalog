var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };
}


function setAttrs(tag, ctx) {
                           var vars = ctx.vars;
                            Object.keys(ctx.attrs).forEach(k => {
     
                                if (k == 'onclick') {
                                    var code = window.puzzle.getRawStatement(ctx.attrs[k] + "");
                                    tag.onclick = null;
                                    tag.onclick = function() {
                                        window.puzzle.parse(code, vars)
                                    }
                                } else if (k == 'ondragstart') {
                                    var code = window.puzzle.getRawStatement(ctx.attrs[k] + "");
                                    tag.ondragstart = null;
                                    tag.ondragstart = function() {
                                        window.puzzle.parse(code, vars)
                                    }
                                } else if (k == 'ondrop') {
                                    var code = window.puzzle.getRawStatement(ctx.attrs[k] + "");
                                    tag.ondragenter="return false;";
                                    tag.ondragover="return false;";
                                    tag.dragover = null;
                                    tag.addEventListener("dragover", (event) => {
                                          // prevent default to allow drop
                                          event.preventDefault();
                                        });

                                    tag.ondrop = function(event) {
                                        event.preventDefault();
                                        window.puzzle.parse(code, vars)

                                    };

                                } else tag[k] = ctx.attrs[k]
                            });
                        }

        var syntax = {
            ui: {
                _static: {
                    routerFunction: () => {
                        console.log('route changed')
                    },
                    elementData: {},
                    keyMappings: {38: 'up', 37:'left', 40:'down', 39:'right', 13:'enter', 46:'delete', 32:'space'},
                    registeredKeyEvents: {

                    },
                    rootNode: 'body',
                    execStatement: (done, ctx) => {

                        function setAttrs(tag) {
                            var vars = ctx.vars;
                            Object.keys(ctx.attrs).forEach(k => {
                                if (k == 'onclick') {
                                    var code = ctx.attrs[k] + "";
                                    tag.onclick = function() {

                                        window.puzzle.parse(code, vars)
                                    }
                                } else if (k == 'ondragstart') {
                                    var code = ctx.attrs[k] + "";

                                    tag.ondragstart = function() {
                                        window.puzzle.parse(code, vars)
                                    }
                                } else if (k == 'ondrop') {
                                    var code = ctx.attrs[k] + "";
                                    tag.ondragenter="return false;";
                                    tag.ondragover="return false;";
                                    
                                    tag.addEventListener("dragover", (event) => {
                                          // prevent default to allow drop
                                          event.preventDefault();
                                        });

                                    tag.ondrop = function(event) {
                                        event.preventDefault();
                                        window.puzzle.parse(code, vars)

                                    };

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
                                    var innerRoot = document.getElementById(context.insideId);
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
                                    var innerRoot = document.getElementById(context.insideId);
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
                router: {
                    follow: ["{cmd}"],
                    method: function(ctx, cmd) {
                        switch(cmd){
                            case 'start':
                            window.addEventListener('load', syntax.ui._static.routerFunction());
                            window.addEventListener('hashchange', syntax.ui._static.routerFunction());
                            break;
                        }
                    }
                },
                scroll: {
                    follow: ["$to"],
                    method: function(ctx, id) {
                       
                    }
                },
                to: {
                    follow: ["{pos}"],
                    method: function(ctx, pos) {
                        if(ctx._sequence.includes('scroll')){
                            window.scrollTo(pos.split(',')[0], pos.split(',')[1]);
                        }
                    }
                },
                get: {
                    follow: ["{id}", "$at", "$and"],
                    method: function(ctx, id) {                        
                        ctx.method = 'get';
                        ctx.tagId = window.puzzle.getRawStatement(id, ctx);
                        ctx.attrs = {};
                    }
                },

                mouse: {
                    follow: ["{coord}"],
                    method: function(ctx, coord) {
                        if(coord == 'x'){
                           ctx.return = ""; 
                        }
                    }
                },

                read: {
                    follow: ["$prop", "{key}"],
                    method: function(ctx, key) { 
                        
                        var elem = document.getElementById(window.puzzle.getRawStatement(ctx.tagId, ctx));
                        var key = window.puzzle.getRawStatement(key, ctx);

                        

                        switch(key){
                            case 'left':
                                ctx.return = parseInt(elem.style.left.replace('px', ''));
                            break;
                            case 'right':
                                ctx.return = parseInt(elem.style.right.replace('px', ''));
                            break;
                            case 'top':
                                ctx.return = parseInt(elem.style.top.replace('px', ''));
                            break;
                            case 'bottom':
                                ctx.return = parseInt(elem.style.bottom.replace('px', ''));
                            break;
                            case 'height':
                                ctx.return = parseInt(elem.height);
                            break;
                            case 'width':
                                ctx.return = parseInt(elem.width);
                            break;
                            default:
                                ctx.return  = (syntax.ui._static.elementData[ctx.tagId] || {})[key];
                            
                        }  
                       
                        /*if(ctx.return === undefined) {
                            ctx.return = document.getElementById(elem).style[key];
                        }*/

                   
                    }
                },
                
                inside: {
                    follow: ["{id}", "$and"],
                    method: function(ctx, id) {
                        ctx.insideId = window.puzzle.getRawStatement(id, ctx);
                        ctx.tagId = window.puzzle.getRawStatement(id, ctx);
                    }
                },
                with: {
                    follow: ["$style", "$click", "$text", "$class", "$id", "{key,value}"],
                    method: function(ctx, data) {
                        if(data) {

                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value, ctx);
                        } 
                    }
                },
                move: {
                    follow: ["{direction,unit}"],
                    method: function(ctx, data) {
                        var unit = data.unit;
                        var direction = data.direction;
                        if(ctx.tagId){
                            switch(direction){
                                case 'left':
                                    document.getElementById(ctx.tagId).style.left = parseInt(document.getElementById(ctx.tagId).style.left.replace('px','')) - parseInt(unit.replace('px','')) + 'px';
                                break;
                                case 'right':
                                    document.getElementById(ctx.tagId).style.left = parseInt(document.getElementById(ctx.tagId).style.left.replace('px','')) + parseInt(unit.replace('px','')) + 'px';
                                break;
                                case 'up':
                                    document.getElementById(ctx.tagId).style.top = parseInt(document.getElementById(ctx.tagId).style.top.replace('px','')) - parseInt(unit.replace('px','')) + 'px';
                                break;
                                case 'down':
                                    document.getElementById(ctx.tagId).style.top = parseInt(document.getElementById(ctx.tagId).style.top.replace('px','')) + parseInt(unit.replace('px','')) + 'px';
                                break;
                            }
                            
                        }
                    }
                },
               
                id: {
                    follow: ["{id}", "$and", "$set"],
                    method: function(ctx, id) {
                        ctx.tagId = window.puzzle.getRawStatement(id, ctx);
                    }
                },
                delete: {
                    follow: ["{id}"],
                    method: function(ctx, id) {
                        try {
                            var el = document.getElementById(window.puzzle.getRawStatement(id, ctx));
                            var parent = el.parentNode;
                            parent.removeChild(el);
                        } catch(e) {}
                    }
                },
                set: {
                    follow: ["$style", "$click", "$text", "$draggable", "$class", "$id", "$prop", "$drag", "$drop", "{key,value}"],
                    method: function(ctx, data) {
                        ctx.method = 'set';
                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value, ctx);
                        } 

                         var tag = document.getElementById(ctx.tagId);
                            setAttrs(tag, ctx);
                            if(ctx.dynamicAttrs) {
                                Object.keys(ctx.dynamicAttrs).forEach(t => {
                                    tag.style[t] = ctx.dynamicAttrs[t]
                                })
                            }
                    }
                },
              
                and: {
                    follow: ["$style", "$click", "$text", "$class", "$set", "$id", "$move", "$src", "$draggable", "$drag", "$drop", "$prop", "$read", "{key,value}"],
                    method: function(ctx, data) {
                        if(data) {
                            if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                            ctx.dynamicAttrs[data.key] = window.puzzle.getRawStatement(data.value, ctx);
                        } 
                    }
                },

                prop: {
                    follow: ["{key,value}", "$and"],
                    method: function(ctx, data) {
                        var key = puzzle.getRawStatement(data.key, ctx);
                        var value = puzzle.getRawStatement(data.value, ctx);
                        
                        if(ctx._sequence.includes('read')){

                            //ctx.return  = (syntax.ui._static.elementData[ctx.tagId] || {})[key];
              
                        } else {

                            if(!syntax.ui._static.elementData[ctx.tagId]) syntax.ui._static.elementData[ctx.tagId] = {};
                            syntax.ui._static.elementData[ctx.tagId][key] = value;
                        }
                    }
                },


                // ATTRIBUTES
                text: {
                    follow: ["{text}", "$and"],
                    method: function(ctx, text) {
                        ctx.attrs['innerText'] = puzzle.getRawStatement(text, ctx);
                         var tag = document.getElementById(ctx.tagId);
                            if(tag) setAttrs(tag, ctx);
                    }
                },
                draggable: {
                    follow: ["{bool}", "$and"],
                    method: function(ctx, bool) {
                        ctx.attrs['draggable'] = puzzle.getRawStatement(bool);
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
                            var tag = document.getElementById(ctx.tagId);
                            if(tag) setAttrs(tag, ctx);
                        }
                },
                click: {
                    follow: ["{click}", "$and"],
                    method: function(ctx, click) {
                        ctx.attrs['onclick'] = puzzle.getRawStatement(click);

                    }
                },
                drag: {
                    follow: ["{drag}", "$and"],
                    method: function(ctx, drag) {
                        ctx.attrs['ondragstart'] = puzzle.getRawStatement(drag);
                    }
                },
                drop: {
                    follow: ["{drop}", "$and"],
                    method: function(ctx, drop) {
                        ctx.attrs['ondrop'] = puzzle.getRawStatement(drop);
                    }
                },
                src: {
                    follow: ["{src}", "$and"],
                    method: function(ctx, src) {
                        ctx.attrs['src'] = puzzle.getRawStatement(src);
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
                        var reservedTags = {
                            box: 'div',
                            image: 'img'
                        };
                        ctx.tagName = reservedTags[tagName] || tagName;
                        if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
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
                    follow: ["$key", "$page"],
                    method: function(ctx, message) {
                        
                    }
                },
                page: {
                    follow: ["{name}"],
                    method: function(ctx, message) {
                        
                    }
                },
                do: {
                    follow: ["{code}"],
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
                },

                // ELEMENTS
                at: {
                  follow: ["{l,t}", "$get", "$and", "$with"],
                  method: function (ctx, param) {
                    
                    ctx.x = window.puzzle.getRawStatement(param.l);
                    ctx.y = window.puzzle.getRawStatement(param.t);

                    if(ctx._sequence.includes('get')){
                            var elem = document.elementFromPoint(ctx.x, ctx.y);
                            ctx.return = elem.id;
                            return;
                        }

                    if(!ctx.dynamicAttrs) ctx.dynamicAttrs = {};
                    ctx.dynamicAttrs.left = ctx.x + "px";
                    ctx.dynamicAttrs.top = ctx.y + "px";
                    ctx.dynamicAttrs.position = "absolute";
                  }
                },
            }
    }

if (_nodejs) module.exports = syntax;