# luke catalog

A collection of official luke modules.

## How to use modules from here

### Use remote modules

You can directly load your required module from this repo:

```luke
use https://raw.githubusercontent.com/luke-lang/luke-catalog/master/modules/<MODULE.js>
```

### Use local modules

If you install this package via npm in the same directory, you can use the shortcut access:

First: 

```shell
npm i luke-catalog
```

Then in your luke script you can use the following shortcut:

```luke
use $catalog/<MODULE.js>
```

(`$catalog` will actually resolve the actual path to the node module)

# Modules

## default

### use {module}

Use a module. {module can either be a local file or loaded over https}

```luke
use example.luke.js

use https://domain.com/example.luke.js
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

#### ... commands

Lists avilable commands for the current namespace.

```luke
list commands;
```

#### ... modules

Lists all used modules

```luke
list modules;
```


### download {url}

Downloads a file

```luke
download https://google.com;
```

