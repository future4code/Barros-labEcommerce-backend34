import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function postPurchase (req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;
    let statusCode = 400;
    try {
      if (!userId || !productId || !quantity) {
        statusCode = 422;
        throw new Error("Informações incompletas.");
      }
      if (typeof quantity !== "number" || quantity <= 0) {
        statusCode = 422;
        throw new Error("Quantidade inválida");
      }
  
      const searchProduct = await connection.raw(`
              SELECT price FROM labecommerce_products WHERE id = ${productId}
          `);
  
      const searchUser = await connection.raw(`
          SELECT id FROM labecommerce_users WHERE id = ${userId}
         `);
  
      if (searchUser[0].length <= 0) {
        statusCode = 404;
        throw new Error("Usuário não encontrado na base de dados.");
      }
  
      if (searchProduct[0].length <= 0) {
        statusCode = 404;
        throw new Error("Produto não encontrado na base de dados.");
      }
      const sum = searchProduct[0][0].price * quantity;
  
      await connection.raw(`
              INSERT INTO labecommerce_purchases (id, user_id, product_id, quantity, total_price)
              VALUES (
                  ${Date.now()},
                  ${userId},
                  ${productId},
                  ${quantity},
                  ${sum}
              )
          `);
  
      res.status(201).send("Compra cadastada com sucesso!");
    } catch (err: any) {
      res.status(statusCode).send(err.message);
    }
  }