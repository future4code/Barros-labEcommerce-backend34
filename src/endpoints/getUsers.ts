import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function getUsers (req: Request, res: Response) {
  const users = await connection.raw(`
  SELECT * FROM labecommerce_users
  LEFT JOIN labecommerce_purchases
  ON labecommerce_users.id = labecommerce_purchases.user_id
  `);

  const result = users&&users[0].map((user: any) => {
    return {
      id: user.id, 
      name: user.name, 
      email: user.email, 
      password: user.password,
      purchases: {
        productId: user.product_id,
        quantity: user.quantity,
        totalPrice: user.total_price
      }
    }
  })
  
  res.status(200).send(result);
}