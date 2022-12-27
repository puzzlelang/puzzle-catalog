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
      execStatement: (done, ctx) => {
        done();
      }
    },
    set: {
      follow: ["$background"],
      method: function (ctx, param) {},
      innerSequence: {
        background: {
          follow: ["{value}"],
          method: function (ctx, param) {
            document.body.style.background = param;
          }
        }
      }
    },
    init: {
      follow: ["{n}"],
      method: function (ctx, param) {}
    },
    create: {
      follow: ["$square"],
      method: function (ctx, param) {
        ctx.domElement = document.createElement("div");
      }
    },
    square: {
      follow: ["{id}", "$with"],
      method: function (ctx, param) {
        ctx.domElement.style.position = "absolute";
        document.body.appendChild(ctx.domElement);
      }
    },
    at: {
      follow: ["{l,t}", "$and", "$with"],
      method: function (ctx, param) {
        ctx.domElement.style.left = param.l + "px";
        ctx.domElement.style.top = param.t + "px";
      }
    },
    with: {
      follow: ["{key,value}", "$and"],
      method: function (ctx, param) {
        ctx.domElement.style[param.key] = param.value;
      }
    },
    and: {
      follow: ["{key,value}", "$and"],
      method: function (ctx, param) {
        ctx.domElement.style[param.key] = param.value;
      }
    },
    inside: {
        follow: ["$render", "{namespace}"],
        method: function(ctx, data) {
            ctx.insideNamespace = data;
        }
    },
    render: {
        follow: ["{html}"],
        method: function(ctx, html) {

            var element = document.createElement('div');
            element.innerHTML = window.puzzle.getRawStatement(html);
            
            if(ctx.insideNamespace) {
                var innerRoot = document.querySelector(ctx.insideNamespace);
                innerRoot.appendChild(element);
            } else document.body.appendChild(element); 
        }
    },
    css: { 
        follow: ["{css}"],
        method: function(ctx, css) {
            var style = document.createElement('style');
            style.innerText = window.puzzle.getRawStatement(css);
            document.body.appendChild(style)
        }
    },
    load: {
        follow: ["{library}"],
        method: function(ctx, library) {
            if(library.includes('.css'))
              {
                  if(library.includes('http://') || library.includes('https://')){
                      fetch(library).then(response => response.text()).then(response => {
                          var tag;
                          tag = document.createElement('link');
                          tag.rel = 'stylesheet';
                          tag.innerText = response;
                          document.head.appendChild(tag);
                      })
                      .catch(error => {
                          // handle the error...
                      });
                      return
                  }
                  /*var tag;
                  tag = document.createElement('link');
                  tag.rel = 'stylesheet';
                  tag.href = context.library;
                  document.head.appendChild(tag);*/
              } else if(context.library.includes('.js')){
                  var tag;
                  tag=document.createElement('script')
                  tag.setAttribute("type","text/javascript")
                  tag.setAttribute("src", library);
                  document.getElementsByTagName("head")[0].appendChild(tag);
                  done();
              } 
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

                    Object.keys(lang.default._static.keyMappings).forEach(_m => {
                        if(lang.default._static.keyMappings[_m] == data.type){
                            keyCode = _m;
                        }
                    })

                    lang.default._static.registeredKeyEvents[keyCode] = window.puzzle.getRawStatement(data.code)

                    document.onkeydown = function(e) {
                        if(lang.default._static.registeredKeyEvents[e.keyCode]){
                            window.puzzle.parse(lang.default._static.registeredKeyEvents[e.keyCode])
                        }
                    };
                }
            }
        },
        method: function(ctx, message) {

        }
    },
  }
};

if (_nodejs) module.exports = syntax;
