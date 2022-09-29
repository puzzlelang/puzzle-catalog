# REST

The REST modules allows you to make calls and requests to apis, websites and everythinig accessible on the internet.

```puzzle
use rest

get from https://google.com as result
print result
```

## Methods

```puzzle
get from https://google.com as result

post {message: "hello"} to https://domain.com

delete from https://domain.com

patch to https://domain.com
```
