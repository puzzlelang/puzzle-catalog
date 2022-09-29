# UI

Official puzzle module for building html sites using natural language.

```puzzle
<html>
<head>
	<script src="https://cdn.jsdelivr.net/npm/puzzlelang@latest/puzzle.browser.js"></script>
</head>
<body>
	<script type="text/x-puzzle">
		use ui;

		css (
			body {
				background:black;
				color:white;
			}
		)

		render (
			<div>hello world</div>
		)

		js {
			console.log('Hello World')
		}
	</script>
</body>
</html>
```

The Language can be used by defining custom "native" html, js and css or by creating elements in natural language.ö

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