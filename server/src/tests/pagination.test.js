import request from "supertest";
import app from "../server.js";

describe("Busca e paginação de materiais", () => {
  it("deve retornar lista paginada de materiais", async () => {
    const res = await request(app).get("/api/materials?page=1&limit=5");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve permitir filtro por título", async () => {
    const res = await request(app).get("/api/materials?title=JavaScript");
    expect(res.statusCode).toBe(200);
    expect(res.body.every(m => m.title.includes("JavaScript"))).toBe(true);
  });
});
