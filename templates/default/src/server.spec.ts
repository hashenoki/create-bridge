import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '~/server';

describe('Endpoints', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    const body = response.body;

    expect(response.status).toEqual(200);
    expect(body).toEqual('Hello World!');
  });

  it('GET /throw', async () => {
    const response = await request(app).get('/throw');
    expect(response.status).toEqual(500);
  });
});
