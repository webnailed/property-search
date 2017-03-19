const search = require('./search');

describe('Search service', function () {

    describe('getSearchResultsFromApi', function () {
        var clock;

        beforeEach(function () {
            clock = sinon.useFakeTimers();
        });

        afterEach(function () {
            clock.restore();
        });

        it('returns a promise', function () {
            expect(search.getSearchResultsFromApi() instanceof Promise).to.be.true;
        });

        it('returns a list of results when searching with postcode are N11', function (done) {
            search.getSearchResultsFromApi('n11').then(results => {
                expect(results.result_count).to.be.above(0);
                done();
            });
            clock.tick(1000);
        });

        it('returns an empty list of results when searching with postcode are SW1 ', function (done) {
            search.getSearchResultsFromApi('sw1').then(results => {
                expect(results.result_count).to.equal(0);
                done();
            });
            clock.tick(1000);
        });
    });

    it('extends a given property object with a new title property', function () {
        let mockProperty = {
            num_bedrooms: 3,
            property_type: 'Flat'
        };

        let expectedTitle = `${mockProperty.num_bedrooms} bedroom ${mockProperty.property_type} for sale`;

        expect(search.createTitle(mockProperty).title).to.equal(expectedTitle);
    });

    it('extends a given property object with a new formatted address property', function () {
        let mockProperty = {
            agent_address: '12, King road, Glasgow',
            agent_postcode: 'GL1 4RD'
        };

        let expectedAddress = `${mockProperty.agent_address}, ${mockProperty.agent_postcode}`;

        expect(search.formatAddress(mockProperty).formatted_address).to.equal(expectedAddress);
    });

    it('extends a given property object with a new formatted price property', function () {
        let mockProperty = {
            price: '123123123'
        };

        let expectedPrice = `£123,123,123`;

        expect(search.formatPrice(mockProperty).formatted_price).to.equal(expectedPrice);
    });

    it('aggregates all the property transforms to a given list of properties', function () {
        let mockProperties = [
            {
                num_bedrooms: 3,
                property_type: 'Flat',
                agent_address: '12, King road, Glasgow',
                agent_postcode: 'GL1 4RD',
                price: '123123123'
            },
            {
                num_bedrooms: 5,
                property_type: 'House',
                agent_address: '1, Queen road, Liverpool',
                agent_postcode: 'L1 1SQ',
                price: '543345'
            }
        ];

        let expectedProperties = [
            {
                num_bedrooms: 3,
                property_type: 'Flat',
                agent_address: '12, King road, Glasgow',
                agent_postcode: 'GL1 4RD',
                price: '123123123',
                title: '3 bedroom Flat for sale',
                formatted_address: '12, King road, Glasgow, GL1 4RD',
                formatted_price: '£123,123,123'
            },
            {
                num_bedrooms: 5,
                property_type: 'House',
                agent_address: '1, Queen road, Liverpool',
                agent_postcode: 'L1 1SQ',
                price: '543345',
                title: '5 bedroom House for sale',
                formatted_address: '1, Queen road, Liverpool, L1 1SQ',
                formatted_price: '£543,345'
            }
        ];

        expect(search.transformSearchResults({listing: mockProperties})).to.deep.equal({listing: expectedProperties});
    });
});

