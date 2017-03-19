const handler = require('./handlers.js');
const searchService = require('../../services/search');

describe('Property search handlers', () => {

    let next,
        request,
        response;

    beforeEach(() => {
        next = () => {};
        request = {
            query: {

            }
        };
        response = {
            viewName: '',
            data: {},
            render: function (view, viewData) {
                this.viewName = view;
                this.data = viewData;
            }
        };
    });

    describe('search route', () => {

        it('should render the search page', () => {
            handler.search(request, response, next);
            expect(response.viewName).to.equal('search');
            expect(response.data.title).to.equal('Property search');
            expect(response.data.hasNoResults).to.be.false;
        });

        it('should render the search page with no results message', () => {
            request.query.noresults = '1';
            handler.search(request, response, next);
            expect(response.viewName).to.equal('search');
            expect(response.data.title).to.equal('Property search');
            expect(response.data.hasNoResults).to.be.true;
        });

    });

    describe('search results route', () => {
        let clock,
            getResultsFromApiStub,
            mockedResults;

        beforeEach(() => {
            getResultsFromApiStub = sinon.stub(searchService, 'getSearchResultsFromApi');
            sinon.stub(searchService, 'transformSearchResults').returns(mockedResults);
            clock = sinon.useFakeTimers();
        });

        afterEach(() => {
            clock.restore();
            getResultsFromApiStub.restore();
            searchService.transformSearchResults.restore();
        });

        it('should render the search results page when api return 1 or more results', () => {
            getResultsFromApiStub.returns(Promise.resolve({
                result_count: 1
            }));
            handler.searchResults(request, response, next);
            setTimeout(() => {
                expect(response.viewName).to.equal('searchResults');
                expect(response.data.title).to.equal('Property search results');
                expect(response.data.results).to.equal(mockedResults);
            }, 0);
        });

        it('should redirect user back to search page indicating no results when ZERO results returned from the API', () => {
            getResultsFromApiStub.returns(Promise.resolve({
                result_count: 0
            }));
            response.redirect = sinon.spy();
            handler.searchResults(request, response, next);
            setTimeout(() => {
                expect(response.redirect).to.have.been.calledWith('/search?noresults=');
            }, 0);
        });
    });
});