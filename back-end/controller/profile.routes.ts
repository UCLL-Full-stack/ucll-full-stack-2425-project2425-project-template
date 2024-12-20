import { Router, Request, Response, NextFunction } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';

const profileRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         bio:
 *           type: string
 *         userId:
 *           type: string
 *     ProfileInput:
 *       type: object
 *       properties:
 *         bio:
 *           type: string
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a profile
 *     tags: [Profiles]
 *     description: Retrieve a profile.
 *     responses:
 *       200:
 *         description: A profile.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     description: Retrieve a single profile by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile ID
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: User not found
 */

profileRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = req.params.id;
        const profile = await profileService.getProfileById(profileId);
        res.status(200).json(profile);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a profile by user ID
 *     tags: [Profiles]
 *     description: Retrieve a single profile by their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A profile object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */

// profileRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.userId;
//         const profile = await profileService.getProfileByUserId(userId);
//         res.status(200).json(profile);
//     } catch (error: any) {
//         const errorMessage = error.message || 'An unexpected error occurred';
//         res.status(400).json({ status: 'error', errorMessage: errorMessage });
//     }
// });

/**
 * @swagger
 * /profiles:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a profile
 *     tags: [Profiles]
 *     description: Create a profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       200:
 *         description: A profile.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Profile'
 */

profileRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileInput: ProfileInput = req.body;
        const result = await profileService.createProfile(profileInput);
        res.status(200).json(result);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default profileRouter;
