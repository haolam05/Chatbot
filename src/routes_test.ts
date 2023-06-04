import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { chat } from './routes';


describe('routes', function() {

  it('chat', function() {
    const req = httpMocks.createRequest({method: 'GET', url: '/',
        query: {message: "I hate computers."}});
    const res = httpMocks.createResponse();
    chat(req, res);

    assert.strictEqual(res._getStatusCode(), 200);
    assert.deepStrictEqual(res._getJSONData(),
        {response: "Do computers worry you?"});
  });

});