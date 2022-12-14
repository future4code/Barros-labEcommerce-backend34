import express from "express"
import cors from 'cors'
import dotenv from 'dotenv';

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config();

app.listen(process.env.PORT || 3003, () => {
    console.log("Server is running in http://localhost:3003");
});

export default app;