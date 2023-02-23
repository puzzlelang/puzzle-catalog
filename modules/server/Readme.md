# Server

```puzzle
use server;
```

Build your own Server with custom server routes.

```puzzle
use server;

// Start server on specified port
start 3000;

// Define a route
on get /test run (
	print "/test was called"
) and return "done!"
```

## Start Server

Start the server on a specified port

```puzzle
start 80;
```

## Define routes

```puzzle
on /say-hello run (print "run some code in the backend") and return "text to be returned to the client"
```