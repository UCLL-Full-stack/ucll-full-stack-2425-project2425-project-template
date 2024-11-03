import ReviewService from "../service/Review.service";
import { Review } from "../model/Review";
import express, { NextFunction, Request, Response } from "express";

const reviewRouter = express.Router();

// Get all reviews
reviewRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await ReviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// Get review by ID
reviewRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await ReviewService.getReviewById(Number(req.params.id));
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// Create a new review
reviewRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = req.body as Review;
        const newReview = await ReviewService.createReview(review);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

export default reviewRouter;
