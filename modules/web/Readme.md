# puzzle web

Official puzzle module for building html sites using natural language.


# Example

```puzzle
<html>
<head>
	<script src="puzzle.js"></script>
</head>
<body>
	<script type="text/x-puzzle">
		use https://cdn.jsdelivr.net/gh/puzzlelang/puzzle-catalog/modules/web/index.js;

		create div with id 123 and text "hello world" and style "background:blue";

		create button inside 123 with text "click me" and onclick "alert('hello')"
	</script>
</body>
</html>
```