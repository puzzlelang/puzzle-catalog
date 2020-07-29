# luke catalog

A collection of official luke modules.

## How to use modules from here


You can directly load your required module remotely (without installation) from this repo or use it locally:

```luke
use https://raw.githubusercontent.com/luke-lang/luke-catalog/master/modules/<MODULE>/index.luke.js
use path/to/<MODULE>.js
```

If you'd like to cache a remote module for future access, use the `permanent`:

```luke
use permanent https://raw.githubusercontent.com/luke-lang/luke-catalog/master/modules/<MODULE>/index.luke.js
```

## default module (built in)

### use (permanent) {module}

Use a module. {module can either be a local file or loaded over https without installation}

```luke
use example.luke.js

use https://domain.com/example.luke.js
```

If you'd like to cache a remote module for future access, use permanent:

```luke
use permanent https://domain.com/example.luke.js;

//to remove it from your local cache:

unuse https://domain.com/example.luke.js;
```

### ns {namespace}

Set a namespace context. Namespace contexts will be active until another `ns`is set or the script ends.

```luke
ns example;
```

### print {text}

Prints something. `{text}`can be of any type.

```luke
print "Hello World"
```

### list ...

***commands***

Lists avilable commands for the current namespace.

```luke
list commands;
```

***modules***

Lists all used modules

```luke
list modules;
```


### download {url}

Downloads a file

```luke
download https://google.com;
```

### install {npm-package}

Installs an npm package into the current directory

```luke
install express
```


# Add your module

In order to add your module to this repo you must meet the following constraints:

* Module has to be a folder under /modules
* Module main file must be called index.luke.js
* A proper module documentation (Readme.md) must be added to your module directory

***Module documentation format:***

Under `#modules`

```
## <MODULE NAME>

<MODULE DESCRIPTION>

### <token> <params>

<TOKEN DESCRIPTION>

<CODE EXAMPLE>
```
