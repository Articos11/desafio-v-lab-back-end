import request from "supertest";
import app from "../server.js";
import { getToken, clearMaterials } from "./setupTestDB.js";

const userToken = getToken(1, "teste@teste.com");
const otherToken = getToken(2, "outro@teste.com");

let materialId;

beforeAll(async () => {
  await clearMaterials();

  const res = await request(app)
    .post("/api/materials")
    .set("Authorization", `Bearer ${userToken}`)
    .send({
      title: "Material de Teste",
      description: "descrição",
      status: "rascunho",
      author_id: 1,
      material_type: "book"
    });

  materialId = res.body.id;
});

describe("Permissões de acesso", () => {
  it("não deve permitir que outro usuário edite o material", async () => {
    const res = await request(app)
      .put(`/api/materials/${materialId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ title: "Tentando editar" });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/Apenas o criador/);
  });
});
