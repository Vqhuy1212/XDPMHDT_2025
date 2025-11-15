import request from 'supertest';
import app from '../server.js';

describe("Analytics Service", () => {

  test("GET /metrics trả về KPI hợp lệ", async () => {
    const res = await request(app).get("/metrics");
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("total_vehicles");
    expect(res.body).toHaveProperty("today_rentals");
  });

  test("GET /history trả về dữ liệu lịch sử", async () => {
    const res = await request(app).get("/history");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.history)).toBe(true);
  });

  test("GET /forecast trả về dữ báo", async () => {
    const res = await request(app).get("/forecast?horizon=6");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("months");
    expect(res.body).toHaveProperty("predicted_rentals");
  });

});
