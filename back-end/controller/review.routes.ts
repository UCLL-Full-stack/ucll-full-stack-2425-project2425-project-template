import express, { Request, Response } from 'express';
import reviewService from '../service/review.service';

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

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Adds a new review for a trip by a student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating given in the review (1-5)
 *               comment:
 *                 type: string
 *                 description: Text comment of the review
 *               tripId:
 *                 type: integer
 *                 description: ID of the trip being reviewed
 *               studentId:
 *                 type: integer
 *                 description: ID of the student making the review
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the review
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
 *                   example: Review creation failed due to a database error.
 */
reviewRouter.post('/', async (req: Request, res: Response) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retrieve a review by ID
 *     description: Returns details of a specific review identified by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the review to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 comment:
 *                   type: string
 *                 student:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                 trip:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     destination:
 *                       type: string
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
 *                   example: Review with ID {id} does not exist.
 */
reviewRouter.get('/:id', async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.id, 10);
  try {
    const review = await reviewService.getReviewById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { reviewRouter };
