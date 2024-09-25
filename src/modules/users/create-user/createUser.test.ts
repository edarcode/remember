import req from "supertest";
import server from "../../../server/server";

describe("POST /users/create-user", () => {
  it("Debería responder con status 400 si los datos son invalidos", async () => {
    const newUser = {
      email: "",
      password: "",
    };
    const res = await req(server).post("/users/create-user").send(newUser);
    expect(res.statusCode).toBe(400);
  });

  // it("Debería crear un nuevo usuario si los datos son válidos", async () => {
  //   const newUser = {
  //     email: "doe@example.com",
  //     password: "pass123",
  //   };

  //   const res = await req(server).post("/users/create-user").send(newUser);
  //   expect(res.statusCode).toBe(201);
  // });
});
