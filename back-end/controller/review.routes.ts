import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';

const reviewRouter = express.Router();

reviewRouter.post('/review/:productId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = req.body;
        const productId = parseInt(req.params.productId);
        const newReview = await reviewService.createReviewForProduct(productId, review);
        res.status(201).json(newReview);
    }
    catch (error) { next(error); }
})
export { reviewRouter };