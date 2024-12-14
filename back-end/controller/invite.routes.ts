import express, { NextFunction, Request, Response } from 'express';
import inviteService from '../service/invite.service';

const inviteRouter = express.Router();

// Create an invitation
inviteRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userEmail = req.body.email;
        const eventId = req.body.eventId;
        const invite = await inviteService.createInvite(userEmail, eventId);
        res.status(200).json(invite);
    } catch (error) {
        next(error);
    }
});

inviteRouter.get('/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        const invites = await inviteService.getInvitesByEventId(eventId);
        res.status(200).json(invites);
    } catch (error) {
        next(error);
    }
});

inviteRouter.get('/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const invites = await inviteService.getInvitesByUserEmail(email);
        res.status(200).json(invites);
    } catch (error) {
        next(error);
    }
});

export { inviteRouter };