
import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';
import { Role, productInput, reviewInput } from '../types';




const reviewRouter = express.Router();

reviewRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: {email: string; role : Role}};
        const { email,role } = request.auth;
        const { id } = req.params;
        const reviewData = <reviewInput>req.body;
        const review = await reviewService.createReviewForProduct(reviewData,parseInt(id), email);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});



export { reviewRouter };