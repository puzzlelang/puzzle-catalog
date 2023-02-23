# Puzzle modules repo
 
This is the official repo for puzzle modules.

> You can directly load your required module remotely (without installation) from this repo. jsDelivr is used as CDN.

```puzzle
use https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/<NAME>/index.js

// If you'd like to cache a remote module for future access, use the `permanent`:
use permanent https://...
```

# Modules 

| Module        | Description  | Link |
| ------------- |-------------| --- |
| [Default (built-in)](https://puzzlelang.github.io/#/LANGUAGE) | Default module that contains the basic puzzle syntax |  |
| [REST](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/rest) | A REST client for consuming any HTTP Interface| [CDN](https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/rest/index.js) |
| [web](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/web) | A module for building web interfaces with html+js+css using concepts of natual language | [CDN](https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/web/index.js) |


* [UI](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/ui/Readme.md) for building user interfaces
* [Fetch](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/fetch/Readme.md) for interacting with web ressources
* [Server](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/server/Readme.md) for building server-side stuff


# Add your module

You are welcome to contribute modules to the ecosystem with a PR.

The following snipped can be used as a template for your module:

```javascript
// index.js
var syntax = {
        module_name: {
            _static: {
                execStatement: (done) => {
                    done();
                }
            },
            token1: {
                follow: ["$token2"],
                method: function(ctx) {

                }
            },
            token2: {
                follow: ["{input}"],
                method: function(ctx, input) {
                    console.log('input:', input)
                }
            }
        }
    }

if (_nodejs) module.exports = syntax;
```

In order to add your module to this repo, it must follow with the following conditions:

* Module has to be a folder under `/modules`
* Module main file must be called `index.js`
* If you have different builds for specific environments, call them like `browser.js`
* A proper module documentation (Readme.md) must be added to your module directory