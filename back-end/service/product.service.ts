import { Product } from '../domain/Product';
import productRepository from '../repository/product.db'; // Repository layer

const getProducts = (): Promise<Product[]> => productRepository.getAll();

export default {
    getProducts,
};
