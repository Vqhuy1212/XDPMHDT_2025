import request from 'supertest';
import app from '../server';

describe('GET /analytics/revenue/daily', () => {
  it('should return daily revenue', async () => {
    const res = await request(app).get('/analytics/revenue/daily');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
