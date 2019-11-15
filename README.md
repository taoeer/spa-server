# spa-server
a server for spa production test


# install 
```bash
npm install spa-server -g
```

# usage
```bash
spa-server -t htt://demo.com
// http://localhost:3000/api/foo/bar -> http://demo.com/foo/bar
````


more use case ``spa-server -h``


```bash
Usage: spa-server|ss [options]

a server for spa production test

Options:
  -V, --version            output the version number
  -p, --port <number>      set the server port (default: 8080)
  -l, --logLevel <string>  set the server port (default: "debug")
  --prefix <string>        set proxy prefix (default: "/api")
  -r --rewrite             rewrite the prfix when proxy (default: true)
  -f --fallback            the index.html page will likely have to be served in place of any 404 responses (default: true)
  -t, --target <string>    set the proxy target url
  -h, --help               output usage information
```
