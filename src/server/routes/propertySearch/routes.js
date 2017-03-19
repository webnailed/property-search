module.exports = function (server) {
    const handlers = require('./handlers.js');

    server.get('/search', handlers.search);
    server.get('/searchResults', handlers.searchResults);
};
