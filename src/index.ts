import app from "./app";
import express, {Request, Response} from "express";

app.get('/teste', (req: Request, res: Response) => {
    res.status(200).send("Teste");
});