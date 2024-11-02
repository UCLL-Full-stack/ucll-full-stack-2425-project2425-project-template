import express, { Request, Response } from 'express';
import tripService from '../service/trip.service';

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
 *                 properties:
 *                   id:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   price:
 *                     type: number
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

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create a new trip
 *     description: Creates a new trip with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the trip
 *               location:
 *                 type: string
 *                 description: The location of the trip
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date of the trip
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end date of the trip
 *               price:
 *                 type: number
 *                 description: The price of the trip
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
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
 *                   example: An error occurred while creating the trip.
 */
tripRouter.post('/', async (req: Request, res: Response) => {
  try {
    const tripInput = req.body;
    const newTrip = await tripService.createTrip(tripInput);
    res.status(201).json(newTrip);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});
/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     summary: Retrieve a trip by ID
 *     description: Returns details of a specific trip identified by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the trip to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the trip
 *                 description:
 *                   type: string
 *                   description: Description of the trip
 *                 location:
 *                   type: string
 *                   description: Location of the trip
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: Start date of the trip
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: End date of the trip
 *                 price:
 *                   type: number
 *                   description: Price of the trip
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
 *                   example: Trip with ID {id} does not exist.
 */
tripRouter.get('/:id', async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.id, 10);
  try {
    const trip = await tripService.getTripById(tripId);
    res.status(200).json(trip);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { tripRouter };
