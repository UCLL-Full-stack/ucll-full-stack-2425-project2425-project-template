import express, { NextFunction, Request, Response } from 'express';
import { Booking } from '../model/booking';
import { BookingInput } from '../types/index';

import bookingService from '../service/booking.service';

interface AuthRequest extends Request {
  auth: {
    username: string;
    role: string;
  };
}

const bookingRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the booking.
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the booking.
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *           description: List of students associated with the booking.
 *         trip:
 *           $ref: '#/components/schemas/Trip'
 *           description: The trip details associated with the booking.
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the student.
 *         username:
 *           type: string
 *           description: The username of the student.
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the trip.
 *         destination:
 *           type: string
 *           description: The destination of the trip.
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the trip.
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the trip.
 *     BookingInput:
 *       type: object
 *       properties:
 *         bookingDate:
 *           type: string
 *           format: date-time
 *         tripId:
 *           type: integer
 *         studentIds:
 *           type: array
 *           items:
 *             type: integer
 *         paymentStatus:
 *           type: string
 *           enum:
 *             - PENDING
 *             - PAID
 *             - FAILED
 *       required:
 *         - bookingDate
 *         - tripId
 *         - studentIds
 *         - paymentStatus
 */

/**
 * @swagger
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
 *                 $ref: '#/components/schemas/Booking'
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
bookingRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, role } = (req as AuthRequest).auth;

    const bookings = await bookingService.getAllBookings({ username, role });

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
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
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
  // try {
    const booking = await bookingService.createBooking(req.body as BookingInput);
    console.log("booking", booking)
    res.status(201).json(booking);
  // } catch (error) {
  //   const err = error as Error;
  //   res.status(400).json({ status: 'error', errorMessage: err.message });
  // }
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
 *               $ref: '#/components/schemas/Booking'
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
bookingRouter.get('/:bookingId', async (req: Request, res: Response, next: NextFunction) => {
  const { bookingId } = req.params;

  if (isNaN(Number(bookingId))) {
    return res.status(400).json({
      status: 'error',
      errorMessage: 'Invalid booking ID provided.'
    });
  }

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
/**
 * @swagger
 * /bookings/{bookingId}:
 *   delete:
 *     summary: Delete a booking by ID
 *     description: Deletes a booking by its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Booking deleted successfully.
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
 *       400:
 *         description: Error occurred during booking deletion
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
 *                   example: Failed to delete booking.
 */
bookingRouter.delete('/:bookingId', async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  if (isNaN(Number(bookingId))) {
    return res.status(400).json({
      status: 'error',
      errorMessage: 'Invalid booking ID provided.',
    });
  }

  try {
    const isDeleted = await bookingService.deleteBooking(Number(bookingId));
    if (isDeleted) {
      res.status(200).json({ status: 'success', message: 'Booking deleted successfully.' });
    }
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
