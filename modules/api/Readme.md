# API

```puzzle
use api;
```

Build your own API with custom server routes.

```puzzle
use api;

// Start server on specified port
start 3000;

// Define a route
on get /test run (
	print "/test was called"
) and return "done!"
```

## Start API

Start the API server on a specified port

```puzzle
start 80;
```

## Define routes

```puzzle
on /say-hello run (print "run some code in the backend") and return "text to be returned to the client"
```