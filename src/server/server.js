const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fourOhFourHandler = require('./routes/404NotFound/handlers.js');
const server = module.exports = express();
const serverPort = process.env.PORT || 3000;

server.set('view engine', 'hbs');
server.use(require('express-promise')());
server.set('views', __dirname + '/views/pages');

server.engine('hbs', exphbs({
    extname: '.hbs',
    partialsDir: [__dirname + '/views/partials']
}));

//Static assets paths
server.use('/dist', express.static('dist'));

require('./routes/')(server);

server.use(function(req, res){
    res.status(404);
    fourOhFourHandler.fourOhFour(req, res);
});

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if(!module.parent) {
    server.listen(serverPort, function () {
        console.log('Property search listening on port ' + serverPort, path.resolve(), __dirname);
    });
}
