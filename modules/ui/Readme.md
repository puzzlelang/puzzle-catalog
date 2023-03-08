# UI

A module for creating and interacting with visual elements. Build user interfaces, animations, simple games, etc.

```puzzle
use ui;
```

## Render elements

```puzzle
// Create an element
render div with id main
	and background white
	and width 100px
	and height 100px;

// or as HTML

render (
	<div>hello</div>
)

// Render inside another element
inside #main render (
	<button>click</button>
)
```

## General Functions

```puzzle
// Set background
set background blue;

// Define css styles (as classes)
define class main {
	background: blue;
}

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