# UI

Official puzzle module for building html sites using natural language.

```puzzle
use ui;

define class main {
	background: blue;
}

render (
	<div class="main">hello world</div>
)

on key space (alert "space key was pressed")
```

## Operations

```puzzle
// Define css styles (as classes)
define class main {
	background: blue;
}

// Render HTML
render (
	<a href="">link</a>
)

// Add JavaScript
js (
	alert('hello, world')
)
```

## User interactions

```puzzle
// Key interaction
on key space (print "space key was pressed")

// Notification
alert Hello

// User input box
prompt "whats your name?"

// Confirmation box
confirm "are you sure"

// Store a user input as variable
prompt "whats your name" as name

// Output it
alert name
``` 