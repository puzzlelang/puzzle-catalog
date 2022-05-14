# REST

```puzzle
use rest;
```

The REST modules allows you to make calls and requests to apis, websites and everythinig accessible on the internet.

You can use the following REST methods:

```puzzle
use rest

get from https://google.com as result
print result
```

## GET
```puzzle
get from https://google.com as result
```

## POST
```puzzle
post {message: "hello"} to https://domain.com
```

## DELETE
```puzzle
delete from https://domain.com
```

## PATCH
```puzzle
patch to https://domain.com
```
