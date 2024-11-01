import { Product } from "../model/product";
import { Review } from "../model/review";

const products = [
    new Product({
        id: 1,
        name: "Toy Train",
        price: 35.10,
        description: "A toy train from the ABD company suitable for children aged 5-12 years old.",
        stock: 10,
        reviews: [
            new Review({
                id: 1,
                score: 1,
                comment: "The toy broke after one use. Very disappointing.",
                date: new Date('2024-01-10')
            }),
            new Review({
                id: 2,
                score: 5,
                comment: "My kids love this toy train! Great quality and fun to play with.",
                date: new Date('2024-01-15')
            })
        ]
    }),
    new Product({
        id: 2,
        name: "smartwatch",
        price: 199.99,
        description: "A sleek smartwatch with heart-rate monitoring and GPS tracking",
        stock: 15,
        reviews: []

    }),
    new Product({
        id: 3,
        name: "backpack",
        price: 49.99,
        description: "A durable backpack with multiple compartments and waterproof material",
        stock: 25,
        reviews: []

    }),
    new Product({
        id: 4,
        name: "mirror",
        price: 25.50,
        description: "A round wall mirror, 24 inches in diameter with a modern metal frame",
        stock: 20,
        reviews: []

    }),
    new Product({
        id: 5,
        name: "book",
        price: 15.00,
        description: "A mystery novel by a bestselling author, great for readers of all ages",
        stock: 30,
        reviews: []

    }),
    new Product({
        id: 6,
        name: "wallet",
        price: 20.00,
        description: "A leather wallet with multiple card slots and a coin pouch",
        stock: 40,
        reviews: []

    }),
    new Product({
        id: 7,
        name: "power bank",
        price: 30.99,
        description: "A compact 10,000mAh power bank with fast-charging capabilities",
        stock: 18,
        reviews: []

    }),
    new Product({
        id: 8,
        name: "rain boots",
        price: 45.00,
        description: "Waterproof rain boots with a comfortable insole, available in various sizes",
        stock: 12,
        reviews: []

    }),
    new Product({
        id: 9,
        name: "tablet",
        price: 299.99,
        description: "A 10-inch tablet with high resolution display and 64GB storage",
        stock: 8,
        reviews: []

    }),
    new Product({
        id: 10,
        name: "treadmill",
        price: 499.00,
        description: "A foldable treadmill with multiple speed settings and an LCD display",
        stock: 5,
        reviews: []

    }),
    new Product({
        id: 11,
        name: "printer",
        price: 125.99,
        description: "A wireless color printer with high-quality photo printing capabilities",
        stock: 10,
        reviews: []

    })
];


const getProductById=({ id }: { id: number }): Product | undefined => {
    try {
        return products.find((product) => product.getId() === id) || undefined;
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

const getReviewsForProduct = ({ id }: { id: number }): Review[] => {
    const product = getProductById({ id });
    if (!product) {
        throw new Error('Product not found');
    }
    return product.getReviews();
}

export default { getAllProducts, getProductById, createProduct, getReviewsForProduct }