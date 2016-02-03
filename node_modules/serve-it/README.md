# serve-it
Simple server to fire up static web content for testing.

```$ npm install --save-dev serve-it```

## Usage

```$ node /path/to/serve-it/server.js```

You will be prompted for path to the folder you want to serve and for
the port number

### npm scripts

You can put the following into your projects package.json

```"scripts": {
        "serve": "node node_modules/serve-it/server.js"
}```

and then run ```$ npm run serve```
