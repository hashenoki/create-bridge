import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '~/server';

describe('Endpoints', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    const body = response.body;

    expect(response.status).toEqual(200);
    expect(body).toEqual({ hello: 'world' });
  });

  it('GET /health-check', async () => {
    const response = await request(app).get('/health-check');
    const body = response.body;

    expect(response.status).toEqual(200);
    expect(body).toEqual({ status: 'ok' });
  });
});
