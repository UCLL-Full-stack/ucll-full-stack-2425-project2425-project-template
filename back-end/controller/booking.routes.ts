import express, { Request, Response } from 'express';
import { Booking } from '../domain/model/booking';
import bookingService from '../service/booking.service';

const bookingRouter = express.Router();

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Retrieve all bookings
 *     description: Returns a list of all bookings with their details, including student and trip information.
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the booking
 *                   bookingDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the booking
 *                   student:
 *                     type: object
 *                     description: The student who made the booking
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   trip:
 *                     type: object
 *                     description: The trip details for the booking
 *                     properties:
 *                       id:
 *                         type: integer
 *                       destination:
 *                         type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
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
 *                   example: An error occurred while retrieving bookings.
 */

bookingRouter.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { bookingRouter };
