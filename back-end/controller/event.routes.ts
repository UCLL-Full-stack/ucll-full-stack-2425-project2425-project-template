/**
 * @Swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *     Event:
 *      type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the event
 *              name:
 *                  type: string
 *                 description: The name of the event
 *              date:
 *                  type: string
 *                  format: date
 *                  description: The date of the event
 *              price:
 *                  type: number
 *                 description: The price of the event
 *              minParticipants:
 *                  type: integer
 *                  description: The minimum number of participants for the event
 *              maxParticipants:
 *                  type: integer
 *                  description: The maximum number of participants for the event
 *              lastEdit:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the last edit of the event
 *              dateCreated:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the creation of the event
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import { Event } from '../model/event';
import eventService from '../service/event.service';

const eventRouter = express.Router();

/**
 * @Swagger
 * /events:
 *   get:
 *    summary: Get all events
 *    responses:
 *       200:
 *          description: A list of events
 *               content:
 *                   application/json:
 *                   schema:
 *                       type: array
 *                           items:
 *                               $ref: '#/components/schemas/Event'
 *
 */

eventRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = eventService.getEvents();
        res.json(events);
    } catch (error) {
        next(error);
    }
});

/**
 *  @Swagger
 * /events/{id}:
 *  get:
 *      summary: Get an event by id
 *     parameters:
 *        - in: path
 *         name: id
 *        required: true
 *     schema:
 *      type: integer
 *    responses:
 *      200:
 *       description: An event
 *      content:
 *         application/json:
 *         schema:
 *             $ref: '#/components/schemas/Event'
 */

eventRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const event = eventService.getEventById(id);
        res.json(event);
    } catch (error) {
        next(error);
    }
});

/**
 * @Swagger
 * /events:
 *  post:
 *      summary: Create a new event
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: The created event
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */

eventRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Event router back end');
        console.log(req.body);
        const event = new Event(req.body);
        const newEvent = eventService.addEvent(event);
        res.json(newEvent);
    } catch (error) {
        next(error);
    }
});

export { eventRouter };
