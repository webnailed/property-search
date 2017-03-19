const handler = require('./handlers.js');

describe('index route handler', () => {

    let next;
    let request;
    let response;

    beforeEach(() => {
        next = () => {};
        request = {};
        response = {
            redirect: sinon.spy()
        };
    });

    it('redirect route path request to the search page', () => {
        handler.index(request, response, next);
        expect(response.redirect).to.have.been.calledWith('/search');
    });
});