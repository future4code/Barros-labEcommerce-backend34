import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function postUser (req: Request, res: Response) {
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
  }