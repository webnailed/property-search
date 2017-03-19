const handler = require('./handlers.js');

describe('404 route handler', () => {
    let next;
    let request;
    let response;

    beforeEach(() => {
        next = () => {};
        request = {};
        response = {
            viewName: '',
            data: {},
            render: function (view, viewData) {
                this.viewName = view;
                this.data = viewData;
            }
        };
    });

    it('should render the 404 page', () => {
        handler.fourOhFour(request, response, next);
        expect(response.viewName).to.equal('404NotFound');
        expect(response.data.title).to.equal('404 Not Found');
    });
});