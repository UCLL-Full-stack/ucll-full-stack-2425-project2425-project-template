type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
}

type ReviewInput = {
    id?: number;
    score: number;
    comment: string;
}

type ProductInput = {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

type ShoppingCartInput = {
    id?: number;
    products: ProductInput[];
    totalPrice: number;
}



export {
    UserInput,
    ReviewInput,
    ProductInput,
    ShoppingCartInput
}