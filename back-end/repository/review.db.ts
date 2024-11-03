import { Review } from '../model/review';
import productDb from './product.db';

const createReviewForProduct = async (productId: number, review: Review): Promise<Review> => {
    const product = await productDb.getProductById({ id: productId });
    if (!product) {
        throw new Error('Product not found');
    }
    product.addReviewToProduct(review);
    return review;
};

export default { createReviewForProduct };
