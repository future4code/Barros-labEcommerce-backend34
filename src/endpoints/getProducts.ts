import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function getProducts (req: Request, res: Response) {
    let order = req.query.order as string;
    let nameSearch = req.query.search as string;
    let statusCode = 400;
    let products;
    try{
      if (!nameSearch) {
        nameSearch = "%"
      }
      if (order !== "asc" && order !== "desc" && order !== "ASC" && order !== "DESC") {
        statusCode = 404;
        throw new Error("Parâmetro errado.");
      }
      if (!order) {
        products = await connection.raw(`SELECT * FROM labecommerce_products
        WHERE name like "%${nameSearch}%"
        `)
      } else {
        products = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE name like "%${nameSearch}%"
        ORDER BY name ${order}
        `);
      }
  
    res.status(200).send(products[0]);
    }catch(err: any) {
      res.status(statusCode).send(err.message);
    }
  }