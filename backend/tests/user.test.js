const express = require("express");
const userRoutes = require("../routes/auth");
const request = require("supertest");

const app = express();
app.use(express.json());
app.use("/auth", userRoutes);

describe("User Routes", () => {
  test("POST /auth/register - success", async () => {
    const response = await request(app).post("/users/register").send({
      fName: "John",
      lName: "Doe",
      email: "fakemail@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully",
    );
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("fName", "John");
  });
});
