import request from 'supertest';
import app from '../server';  // Cấu hình server.js

describe('POST /auth/login', () => {
  it('should return token on successful login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@ev-rental.com', password: 'admin123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
