module.exports = function (server) {
    const handlers = require('./handlers.js');

    server.get('/404NotFound', handlers.fourOhFour);
};