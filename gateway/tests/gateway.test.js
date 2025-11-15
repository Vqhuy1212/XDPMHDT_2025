import request from 'supertest';
import app from '../server.js';   // Export app từ server.js

describe("Gateway API", () => {

  test("GET /health trả về trạng thái OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("Forward /api/metrics → Analytics Service", async () => {
    const res = await request(app).get("/api/metrics");

    // Chỉ kiểm tra có response là đủ (vì thực tế gọi sang service khác)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("total_vehicles");
  });

  test("Forward /api/history → Analytics Service", async () => {
    const res = await request(app).get("/api/history");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("history");
  });

  test("Download PDF /api/report/pdf", async () => {
    const res = await request(app)
      .post("/api/report/pdf")
      .send({ type: "summary", payload: {} });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
  });

});
