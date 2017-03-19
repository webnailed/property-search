const mockSearchResults = require('../mocks/property.json');

const searchService = {
    getSearchResultsFromApi: getSearchResultsFromApi,
    transformSearchResults: transformSearchResults,
    createTitle: createTitle,
    formatAddress: formatAddress,
    formatPrice: formatPrice
};

module.exports = searchService;

function transformSearchResults(results) {
    let listings = results.listing;

    results.listing = listings.map(listing => {
        listing = searchService.createTitle(listing);
        listing = searchService.formatAddress(listing);
        listing = searchService.formatPrice(listing);
        return listing;
    });

    return results;
}

function getSearchResultsFromApi(searchText = '') {
    let result = searchText.toLowerCase() === 'n11' ? mockSearchResults : {
        result_count: 0
    };

    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result), 50);
    });
}


function createTitle(listing) {
    listing.title = `${listing.num_bedrooms} bedroom ${listing.property_type} for sale`;
    return listing
}

function formatAddress(listing) {
    listing.formatted_address = `${listing.agent_address}, ${listing.agent_postcode}`;
    return listing;
}

function formatPrice(listing) {
    listing.formatted_price = `£${numberWithCommas(listing.price)}`;
    return listing;
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

