import app from "./app";
import { getProducts } from "./endpoints/getProducts";
import { getPurchaseOfAnUser } from "./endpoints/getPurchaseOfAnUser";
import { getUsers } from "./endpoints/getUsers";
import { postProduct } from "./endpoints/postProduct";
import { postPurchase } from "./endpoints/postPurchase";
import { postUser } from "./endpoints/postUser";

app.get("/users", getUsers);

app.post("/users", postUser);

app.get("/products", getProducts);

app.post("/products", postProduct);

app.post("/purchases", postPurchase);

app.get("/users/:user_id/purchases", getPurchaseOfAnUser)
