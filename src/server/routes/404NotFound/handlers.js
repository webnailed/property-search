module.exports = {

    fourOhFour: function (req, res) {
        res.render('404NotFound', {
            title: '404 Not Found'
        });
    }
};
