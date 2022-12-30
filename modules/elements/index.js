var syntax = {
  elements: {
    _static: {
      execStatement: (done, ctx) => {
        done();
      }
    },
    init: {
      follow: ["{n}"],
      method: function (ctx, param) {}
    },
    create: {
      follow: ["$square", "$circle"],
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
    circle: {
      follow: ["{id}", "$with"],
      method: function (ctx, param) {
        ctx.domElement.style.position = "absolute";
        ctx.domElement.style.borderRadius = "100000px";
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
