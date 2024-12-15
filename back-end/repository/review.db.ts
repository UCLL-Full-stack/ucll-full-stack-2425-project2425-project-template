import { Review } from "../model/review";
import { ReviewInput } from "../types";
import database from "../util/database"

const findAllReviews = async(): Promise<Review[]> => {
    try{
        const reviewsPrisma = await database.review.findMany({
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
            }
        }); 
        if(!reviewsPrisma) return [];
        return reviewsPrisma.map(review=>Review.from(review));
    }catch(e){
        throw new Error("DB error");
    }
}

const findUserReviews = async(id: number): Promise<Review[]>=>{
    try{
        const reviewsPrisma = await database.review.findMany({
            where: {authorId: id},
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
            }
        });
        if(!reviewsPrisma) return [];
        return reviewsPrisma.map(review=>Review.from(review));
    }catch(e){
        throw new Error("DB ERROR (review)");
    }
}

const createReview = async (review: ReviewInput): Promise<Review>=>{
    try{
        const reviewPrisma = await database.review.create({
            data:{
                title: review.title,
                body: review.body,
                albumID: review.albumId,
                starRating: review.starRating,
                likeCount: 0,
                author: {
                    connect: {id: review.authorId}
                },
            },
            include:{
                author: true
            }
        });
        return Review.from(reviewPrisma);
    }catch(e){
        throw new Error("DB ERROR (review)");
    }
}

const deleteReview = async (id: number)=>{
    try{
        await database.comment.deleteMany({
            where: {reviewId: id}
        });

        await database.review.delete({
            where: {id: id}
        });
    }catch(e){
        throw new Error("DB ERROR (review)");
    }
}

export default{
    findAllReviews,
    findUserReviews,
    createReview,
    deleteReview
}
