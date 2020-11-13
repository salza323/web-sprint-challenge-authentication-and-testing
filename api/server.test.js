const request = require('supertest');
const server = require('./server.js');

describe('server.js module', () => {
  it('is the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('[GET] /', () => {
    it('server get request returns json', () => {
      return request(server).get('/').expect('Content-Type', /json/);
    });
  });
});
