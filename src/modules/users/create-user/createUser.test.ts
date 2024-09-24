import req from "supertest";
import server from "../../../server/server";

describe("POST /users/create-user", () => {
  test("should resp with status 400", async () => {
    const res = await req(server).post("/users/create-user").send();
    expect(res.status).toBe(400);
  });
});
