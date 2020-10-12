# Puzzle modules repo
 
This is the official repo for puzzle modules.

> You can directly load your required module remotely (without installation) from this repo. jsDelivr is used as url shortener.

```puzzle
use https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/<NAME>/index.puzzle.js

// If you'd like to cache a remote module for future access, use the `permanent`:
use permanent https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/<NAME>/index.puzzle.js
```

# Modules 

| Module        | Description  | Link |
| ------------- |-------------| --- |
| [Default (built-in)](https://puzzlelang.github.io/#/LANGUAGE) | Default module that contains the basic puzzle syntax |  |
| [REST](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/rest) | A REST client for consuming any HTTP Interface| [CDN](https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/rest/index.js) |
| [web](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/web) | A module for building web interfaces with html+js+css using concepts of natual language | [CDN](https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/web/index.js) |


# Add your module

You are welcome to contribute modules to the ecosystem with a PR.

In order to add your module to this repo, it must follow with the following conditions:

* Module has to be a folder under `/modules`
* Module main file must be called `index.js`
* If you have different builds for specific environments, call them like `browser.js`
* A proper module documentation (Readme.md) must be added to your module directory