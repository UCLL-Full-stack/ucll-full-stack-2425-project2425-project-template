import express, { Request, Response } from 'express';

const tripRouter = express.Router();

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     responses:
 *       200:
 *         description: A list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
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
 */
tripRouter.get('/', async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { tripRouter };
