import { Product } from "../model/product";

const products = [
    new Product({
        name: "toy train",
        price: 35.10,
        description: "A toy train from the ABD company suitable for children aged 5-12 years old",
        stock: 10
    }),
    new Product({
        name: "smartwatch",
        price: 199.99,
        description: "A sleek smartwatch with heart-rate monitoring and GPS tracking",
        stock: 15
    }),
    new Product({
        name: "backpack",
        price: 49.99,
        description: "A durable backpack with multiple compartments and waterproof material",
        stock: 25
    }),
    new Product({
        name: "mirror",
        price: 25.50,
        description: "A round wall mirror, 24 inches in diameter with a modern metal frame",
        stock: 20
    }),
    new Product({
        name: "book",
        price: 15.00,
        description: "A mystery novel by a bestselling author, great for readers of all ages",
        stock: 30
    }),
    new Product({
        name: "wallet",
        price: 20.00,
        description: "A leather wallet with multiple card slots and a coin pouch",
        stock: 40
    }),
    new Product({
        name: "power bank",
        price: 30.99,
        description: "A compact 10,000mAh power bank with fast-charging capabilities",
        stock: 18
    }),
    new Product({
        name: "rain boots",
        price: 45.00,
        description: "Waterproof rain boots with a comfortable insole, available in various sizes",
        stock: 12
    }),
    new Product({
        name: "tablet",
        price: 299.99,
        description: "A 10-inch tablet with high resolution display and 64GB storage",
        stock: 8
    }),
    new Product({
        name: "treadmill",
        price: 499.00,
        description: "A foldable treadmill with multiple speed settings and an LCD display",
        stock: 5
    }),
    new Product({
        name: "printer",
        price: 125.99,
        description: "A wireless color printer with high-quality photo printing capabilities",
        stock: 10
    })
];


const getProductById=({ id }: { id: number }): Product | null => {
    try {
        return products.find((product) => product.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllProducts = ():Product[] => products;

const createProduct = (product:Product):Product=> {
    products.push(product)
    return product
}