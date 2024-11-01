import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile.service';

const profileRouter = express.Router();

profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await profileService.getAllProfiles());
});

profileRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await profileService.getProfileById(parseInt(req.params.id)));
});


export { profileRouter };