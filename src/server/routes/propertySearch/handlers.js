const searchService = require('../../services/search');

module.exports = {
    searchResults: (req, res) => {
        searchService.getSearchResultsFromApi(req.query.searchText)
            .then(results => {
                if(results.result_count) {
                    res.render('searchResults', {
                        title: 'Property search results',
                        results: searchService.transformSearchResults(results)
                    });
                } else {
                    res.redirect('/search?noresults=1');
                }
            })
    },
    search: (req, res) => {
        res.render('search', {
            title: 'Property search',
            hasNoResults: !!req.query.noresults
        });
    }
};


