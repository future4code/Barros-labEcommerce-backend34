import {connection} from "./connection"

const createTableUsers = () => connection.raw(
        `
        CREATE TABLE IF NOT EXISTS labecommerce_users (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
        `
    )

const createTableProducts = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS labecommerce_products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        image_url VARCHAR(255) NOT NULL
    )
`)

const createTablePurchases = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS labecommerce_purchases (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES labecommerce_users (id),
        FOREIGN KEY (product_id) REFERENCES labecommerce_products (id)
    )
`)

createTableUsers()
.then(() => console.log("Tabela de usuários criada com sucesso na base de dados!"))
.then(()=> createTableProducts())
.then(() => console.log("Tabela de produtos criada com sucesso na base de dados!"))
.then(() => createTablePurchases())
.then(() => console.log("Tabela de compras criada com  na base de dados!"))
.catch((error: any) => console.log(error.sqlMessage || error.message))
.finally(() => connection.destroy())
