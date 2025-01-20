/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');
const { BASE_URL } = require('../utils/env');

describe('POST /shorten', () => {
  test('should create a new short URL', async () => {
    return request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://www.example.com' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('shortenedUrl');
      });
  });

  test('should return 400 if original URL is missing', async () => {
    return request(app)
      .post('/shorten')
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'URL is required');
      });
  });

  // 4. custom alias link test
  test('should create a new short URL with custom alias', async () => {
    return request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://www.example.com', alias: 'example' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('shortenedUrl', `${BASE_URL}/example`);
      });
  });

  test('should return 409 if alias is already taken', async () => {
    return request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://www.example.com', alias: 'example' })
      .expect(409)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'Alias already in use');
      });
  });
});

describe('GET /:shortUrl', () => {
  // 5. redirect test
  test('should redirect to the original URL', async () => {
    return request(app)
      .get('/example')
      .expect(302)
      .then((response) => {
        expect(response.header.location).toBe('https://www.example.com');
      });
  });

  test('should return 404 if short URL is not found', async () => {
    return request(app)
      .get('/notfound')
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'URL not found');
      });
  });
});
