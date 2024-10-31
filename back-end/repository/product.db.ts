import { Product } from "../model/product";

const products = [
    new Product({id: 1, name: "Product 1", price: 100, description: "Description 1", stock: 10}),
    new Product({id: 2, name: "Product 2", price: 200, description: "Description 2", stock: 20}),
    new Product({id: 3, name: "Product 3", price: 300, description: "Description 3", stock: 30}),
]

const getAllProducts = async (): Promise<Product[]> => {
    return products;
}


export default { getAllProducts }