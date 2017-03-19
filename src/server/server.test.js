import server from './server';
import {agent} from 'supertest';

let request = agent(server);

describe('Testing server error handling routes', function () {

    it('should receive a 404 for an unknown url', function (done) {
        const url = '/thisRouteDoesNotExist';

        request
            .get(url)
            .expect(404)
            .end(done);
    });

    it('redirect to /search from the route url', function(done){
        const url = '/';
        request
            .get(url)
            .expect('Location', /search/, done);
    });

});
