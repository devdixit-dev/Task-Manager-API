import request from 'supertest';
import app from '../../index.js';

test("POST /api/auth/check check the route", async () => {
  const res = await request(app).get('/check');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ success: true })
});