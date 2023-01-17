export type User = {
    id: string, 
    name: string, 
    email: string, 
    password: string,
    purchases: {
        productId: string,
        quantity: number,
        totalPrice: number
    }
}