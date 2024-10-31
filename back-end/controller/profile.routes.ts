import express, { NextFunction, Request, Response } from 'express';
import { ProfileUpdateInput } from '../types';
import profileService from '../service/profile.service';

const profileRouter = express.Router();

// Get profile by user ID
profileRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const profile = await profileService.getProfileByUserId(userId);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

// Update profile
profileRouter.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const profileUpdate: ProfileUpdateInput = req.body;
        const updateProfile = await profileService.updateProfile(userId, profileUpdate);
        res.status(200).json(updateProfile);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
