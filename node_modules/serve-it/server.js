var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    prompt = require('prompt'),
    path, port;

prompt.start();

prompt.get(['path', 'port'], function(err, result) {

    if(err) {
        return onError(err);
    }

    path = result.path;
    port = result.port;

    app.use(express.static(path));

    http.listen(port, function() {
        console.log('Serving ' + path + ' on port: ' + port);
    });
});

function onError(err) {
    console.log(err);
    return 1;
}
