# puzzle ui

Official puzzle module for building html sites using natural language.

# Example

```puzzle
<html>
<head>
	<script src="puzzle.js"></script>
</head>
<body>
	<script type="text/x-puzzle">
		use ui;

		create div with id 123 and text "hello world" and style "background:blue";

		create button inside 123 with text "click me" and click "alert('hello')"
	</script>
</body>
</html>
```

# Language

The Language can be used by defining custom "native" html, js and css or by creating elements in natural language.

## Native code

### render html

Render a html.

```puzzle
render (
	<div>hello world</div>
)
```

### javascript

Inject custom javascript. 

```puzzle
js {
	console.log('Hello World')
}
```

### css

Inject custom css. 

```puzzle
css (
	body {
		background:black;
		color:white;
	}
)
```

## Natual language code

### create element

- Create an element: `create TAGNAME with id|style|click|text`
- Create an element inside another one: `create TAGNAME inside ID with id|style|click|text`

```puzzle
create div with id 123 and style "color:blue";

create button inside 123 with text "Click me" and click "alert('hi there')"
```

### get/alter an element

```puzzle
get div with id 123 and set style "color:red";
```