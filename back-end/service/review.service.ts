
import { Review } from "../model/review";
import productDb from "../repository/product.db";
import reviewDb from "../repository/review.db";



const createReviewForProduct = async (productId: number, review: Review): Promise<Review> => {
    const reviews = await reviewDb.createReviewForProduct(productId, review);
    return reviews;

}

export default { createReviewForProduct } 