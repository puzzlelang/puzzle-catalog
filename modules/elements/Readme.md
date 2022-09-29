# Elements

A module for creating and interacting with visual elements. Build user interfaces, animations, simple games, etc.

```puzzle
<html>
<head>
	<script src="https://cdn.jsdelivr.net/npm/puzzlelang@latest/puzzle.browser.js"></script>
</head>
<body>
	<script type="text/x-puzzle">
		use elements;

		set background blue;

		create square "main" 
			with background white
			and width 100px
			and height 100px;
	</script>
</body>
</html>
```

## Generic methods:

```puzzle
set background color;
```

## Elements:

### Create

```puzzle
create ELEMENTTYPE ID at X Y with STYLEATTRIBUTE VALUE and STYLEATTRIBUTE VALUE;
```

### Change

```puzzle
get ELEMENTTYPE ID and set color blue;
```