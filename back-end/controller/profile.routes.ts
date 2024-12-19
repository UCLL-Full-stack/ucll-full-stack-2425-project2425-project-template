// ---- Not Yet Used ----

import express, { NextFunction, Request, Response } from 'express';
import { ProfileUpdateInput } from '../types';
import profileService from '../service/profile.service';

const profileRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Profile management
 */

/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     summary: Get profile by user ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user profile object
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
profileRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const profile = await profileService.getProfileByUserId(userId);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{userId}:
 *   put:
 *     summary: Update profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated profile object
 *       400:
 *         description: Bad request
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
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
