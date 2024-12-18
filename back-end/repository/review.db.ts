import { Review } from "../model/review";
import database from "./database";



const createReviewForProduct = async ({rating,text,user,product} : Review): Promise<Review> => {
    try {
        const reviewPrisma = await database.review.create({
            data: {
                rating,
                text,
                user: {
                    connect: { id: user.getId() } // Assuming `getId()` method exists
                },
                product: {
                    connect: { id: product.getId() } // Assuming `getId()` method exists
                }
            },
            include: {
                user: true, // Fetch user relation
                product: true // Fetch product relation
            }
        });
        return Review.from(reviewPrisma, user, product);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}


export default{
    createReviewForProduct,
}