# Puzzle modules repo
 
This is the official repo for puzzle modules.

# Install a module

You can directly load your required module remotely (without installation) from this repo or use it locally

> remote (no installation)

```puzzle
use https://raw.githubusercontent.com/puzzle-lang/puzzle-catalog/master/modules/<MODULE>/index.puzzle.js

// If you'd like to cache a remote module for future access, use the `permanent`:
use permanent https://raw.githubusercontent.com/puzzle-lang/puzzle-catalog/master/modules/<MODULE>/index.puzzle.js
```

# Modules 

| Module        | Description  |
| ------------- |-------------| 
| [Default (built-in)](https://puzzlelang.github.io/#/LANGUAGE) | Default module that contains the basic puzzle syntax | 
| [REST](https://github.com/puzzlelang/puzzle-catalog/tree/master/modules/rest) | A REST client for consuming any HTTP Interface| 


# Add your module

You are welcome to contribute modules to the ecosystem with a PR.

In order to add your module to this repo, it must follow with the following conditions:

* Module has to be a folder under `/modules`
* Module main file must be called `index.puzzle.js`
* If you have different builds for specific environments, call them like `browser.puzzle.js`
* A proper module documentation (Readme.md) must be added to your module directory