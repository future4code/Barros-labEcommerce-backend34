import app from "./app";
import express, { Request, Response } from "express";
import { connection } from "./data/connection";

app.get("/users", async (req: Request, res: Response) => {
  const users = await connection.raw(`SELECT * FROM labecommerce_users`);
  res.status(200).send(users[0]);
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errorCode = 400;
  try {
    if (!name || !email || !password || !passwordConfirm) {
      errorCode = 422;
      throw new Error("Dados incompletos.");
    }
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      errorCode = 422;
      throw new Error("Formato de dados inválido");
    }
    if (password !== passwordConfirm) {
      errorCode = 422;
      throw new Error("Senhas precisam ser iguais.");
    }

    await connection.raw(`
            INSERT INTO labecommerce_users (id, name, email, password)
            VALUES (
                "${Date.now()}",
                "${name}",
                "${email}",
                "${password}"
            );
        `);
    res.status(201).send("Usuário inserido na base de dados com sucesso!");
  } catch (err: any) {
    res.status(errorCode).send(err.message);
  }
});

app.get("/products", async (req: Request, res: Response) => {
    const products = await connection.raw(`SELECT * FROM labecommerce_products`);
    res.status(200).send(products[0]);
})

app.post("/products", async (req: Request, res: Response) => {
  const { name, price, image } = req.body;
  let statusCode = 400;
  try {
    if (!name || !price || !image) {
      statusCode = 422;
      throw new Error("Dados incompletos.");
    }
    if (typeof name !== "string" || typeof image !== "string") {
      statusCode = 422;
      throw new Error(
        "Nome e url da imagem devem ser passados em formato string."
      );
    }
    if (typeof price !== "number" || price <= 0) {
      statusCode = 422;
      throw new Error("Preço inválido.");
    }

    await connection.raw(`
    INSERT INTO labecommerce_products (id, name, price, image_url)
    VALUES (
        "${Date.now()}",
        "${name}",
        ${price},
        "${image}"
    );
`);
    res.status(201).send("Produto inserido na base de dados com sucesso!");
  } catch (err: any) {
    res.status(statusCode).send(err.message);
  }
});
