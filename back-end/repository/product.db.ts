import { Product } from "../model/product";

const products = [
    new Product({
    id:1,
    name: 'speaker',
    price: 100,
    description: "well made speaker",
    rating: 4,
    }),
    new Product({
        id: 2,
        name: 'mouse',
        price: 200,
        description: "well made mouse",
        rating: 4,
    }),
];

const getAllproducts = (): Product[] => {
    return products;
};

const getProductById = ({id}: {id:number}):Product | null => {
    const product = products.find((aProduct) => aProduct.getId() === id);
    if (!product) {
        return null;
    }
    return product;
}

export default {
    getAllproducts,
    getProductById
};
