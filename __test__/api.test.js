const request = require("supertest");
const app = require("../app");

describe("Test endpoint GET /", () => {
  test("Success - 200 - Get Image", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Failed - 404 - Not Found Image", async () => {
    const response = await request(app).get("/?page=9");
    expect(response.status).toBe(404);
  });
});
