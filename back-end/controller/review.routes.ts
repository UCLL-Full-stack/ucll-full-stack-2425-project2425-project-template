import express, { Request, Response } from 'express';

const reviewRouter = express.Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     description: Returns a list of all reviews, including details about the reviewer and the trip reviewed.
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the review
 *                   rating:
 *                     type: integer
 *                     description: Rating given in the review (1-5)
 *                   comment:
 *                     type: string
 *                     description: Text comment of the review
 *                   student:
 *                     type: object
 *                     description: The student who made the review
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   trip:
 *                     type: object
 *                     description: The trip that was reviewed
 *                     properties:
 *                       id:
 *                         type: integer
 *                       destination:
 *                         type: string
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: An error occurred while retrieving reviews.
 */
reviewRouter.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { reviewRouter };
