import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function postProduct (req: Request, res: Response) {
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
  }