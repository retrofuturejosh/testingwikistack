var http = require('http');
var server = http.createServer();
var models = require('./models');
var Promise = require('bluebird');
var db = models.db
server.on('request', require('./app'));

// Promise.all([
//         models.User.sync({}),
//         models.Page.sync({})
//     ])
db.sync({force: true})
    .then(function () {
        server.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    })
    .catch(console.error);

