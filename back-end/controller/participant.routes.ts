import express, { Request, Response } from 'express';
import eventService from '../service/event.service';

const participantRouter = express.Router();

participantRouter.get('/:email', async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
        const events = eventService.getEventsByParticipantEmail(email);
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Could not fetch event.' });
    }
});

export {participantRouter};