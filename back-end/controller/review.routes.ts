import { Request, Response } from "express";
import reviewService from "../service/review.service";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reviewRouter = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Submit a new review
 *     description: Adds a new review for a movie by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the review.
 *               rating:
 *                 type: integer
 *                 description: The rating for the movie (1 to 5).
 *               userId:
 *                 type: integer
 *                 description: The ID of the user submitting the review.
 *               movieId:
 *                 type: integer
 *                 description: The ID of the movie being reviewed.
 *             required:
 *               - text
 *               - rating
 *               - userId
 *               - movieId
 *     responses:
 *       201:
 *         description: Review submitted successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 *       500:
 *         description: Internal server error.
 */

reviewRouter.post('/reviews', async (req: Request, res: Response) => {
    const { movieId, rating, text } = req.body;
    const userId = 1;

    try {
        if (!userId || !movieId || !rating || !text) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        const movie = await prisma.movie.findUnique({ where: { id: movieId } });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found." });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        }
        
        const review = await prisma.review.create({
            data: {
                rating,
                text,
                userId,
                movieId,
            },
        });

        res.status(201).json({message: "Review created successfully."});
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
});


/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Fetches a specific review based on the review ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the review to fetch.
 *     responses:
 *       200:
 *         description: The review for the movie with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 rating:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 movieId:
 *                   type: integer
 *       400:
 *         description: Invalid ID or failed to fetch review.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */

export const getReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const review = await reviewService.getReview(id);
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};



export { reviewRouter };