import express, { Request, Response } from 'express';
import { Booking } from '../model/booking';
import bookingService from '../service/booking.service';

const bookingRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /bookings:
 *   get:
 *     summary: Retrieve all bookings
 *     description: Returns a list of all bookings with their details, including student and trip information.
 *     security:
 *       - bearerAuth: []
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
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Unique identifier for the student
 *                         username:
 *                           type: string
 *                           description: The student's username
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

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Creates a new booking with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the booking
 *               tripId:
 *                 type: integer
 *                 description: ID of the trip being booked
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of student IDs making the booking
 *               paymentStatus:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - Completed
 *                   - Failed
 *                 description: The status of the payment
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the newly created booking
 *       400:
 *         description: Error occurred during booking creation
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
 *                   example: Booking creation failed due to a database error.
 */
bookingRouter.post('/', async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

/**
 * @swagger
 * /bookings/{bookingId}:
 *   get:
 *     summary: Retrieve a booking by ID
 *     description: Returns the details of a specific booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 bookingDate:
 *                   type: string
 *                   format: date-time
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                 trip:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     destination:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *       404:
 *         description: Booking not found
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
 *                   example: Booking with ID {bookingId} does not exist.
 */
bookingRouter.get('/:bookingId', async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  
  try {
    const booking = await bookingService.getBookingById(Number(bookingId));
    res.status(200).json(booking);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("does not exist")) {
      res.status(404).json({ status: 'error', errorMessage: err.message });
    } else {
      res.status(400).json({ status: 'error', errorMessage: err.message });
    }
  }
});

export { bookingRouter };