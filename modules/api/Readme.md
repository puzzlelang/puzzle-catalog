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