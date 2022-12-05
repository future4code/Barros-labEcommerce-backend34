import express, { Request, Response } from "express";
import { connection } from "../data/connection";
import { User } from "../data/types";

export async function getPurchaseOfAnUser (req: Request, res: Response) {
    const user_id = req.params.user_id as string;
    let statusCode = 400;
    try{
        const searchUser = await connection.raw(`
        SELECT id FROM labecommerce_users WHERE id = ${user_id}
    `)

    if(searchUser[0].length <= 0) {
        statusCode = 404;
        throw new Error("Id de usuário inválido.");
    }

    const searchPursaches = await connection.raw(`
        SELECT * FROM labecommerce_purchases
        WHERE user_id = ${user_id}
    `)

    if(searchPursaches[0] <= 0) {
        statusCode = 404;
        throw new Error("Nenhum registro de compra para o usuário informado.");
        
    }

    res.status(200).send(searchPursaches[0]);

    }catch(err: any) {
        res.status(statusCode).send(err.message);
    }
}