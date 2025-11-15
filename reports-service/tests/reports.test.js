import request from 'supertest';
import app from '../server.js';

describe("Reports Service", () => {

  test("POST /report/pdf tạo PDF", async () => {
    const res = await request(app)
      .post("/report/pdf")
      .send({
        type: "summary",
        payload: {
          metrics: { total_vehicles: 100 },
          table: []
        }
      });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
  });

  test("POST /report/excel tạo Excel", async () => {
    const res = await request(app)
      .post("/report/excel")
      .send({
        type: "summary",
        payload: {
          metrics: { total_vehicles: 50 },
          table: []
        }
      });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"])
      .toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  });

});
