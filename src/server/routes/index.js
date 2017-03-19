module.exports = function (server) {
    require('./main/routes')(server);
    require('./propertySearch/routes')(server);
    require('./404NotFound/routes')(server);
};
