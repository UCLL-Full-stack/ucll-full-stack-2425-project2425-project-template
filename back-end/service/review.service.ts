import { Review } from "../model/review";
import productDb from "../repository/product.db";
import reviewDb from "../repository/review.db";
import userDb from "../repository/user.db";
import { Role, reviewInput } from "../types";



const createReviewForProduct = async ({rating,text}: reviewInput, productId: number, email : string): Promise<Review> => {
    if (!text) {
        throw new Error("Name is required");
    }
    if (!rating) {
        throw new Error("Email is required")
    }
    
    const existingUserByEmail = await userDb.getUserByEmail(email);
    if (!existingUserByEmail) {
        throw new Error(`User with email ${email} does not exist.`);
    }

    const existingProductById = await productDb.getProductById({id : productId});
    if (!existingProductById) {
        throw new Error(`this product does not exist.`);
    }


    const review = new Review({rating,text,user : existingUserByEmail,product : existingProductById});
    const createdReview = await reviewDb.createReviewForProduct(review);

    return createdReview;


}



export default {
    createReviewForProduct,
}