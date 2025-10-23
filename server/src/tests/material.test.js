import request from "supertest";
import app from "../server.js";
import { getToken } from "./setupTestDB.js";

const token = getToken(1, "teste@teste.com");

describe("Validações de criação de material", () => {
  it("deve retornar erro se campos obrigatórios estiverem ausentes", async () => {
    const res = await request(app)
      .post("/api/materials")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "", status: "rascunho" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Todos os campos");
  });

  it("deve retornar erro se status for inválido", async () => {
    const res = await request(app)
      .post("/api/materials")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Livro Teste",
        description: "desc",
        status: "invalido",
        author_id: 1,
        material_type: "book"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Status inválido.");
  });
});
