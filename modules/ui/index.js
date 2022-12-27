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
    }
  }
};

if (_nodejs) module.exports = syntax;
