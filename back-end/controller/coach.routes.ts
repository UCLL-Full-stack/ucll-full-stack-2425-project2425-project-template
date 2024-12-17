import express from 'express';
import { CoachInput } from '../types';
import coachService from '../service/coach.service';

const coachRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Coach:
 *       type: object
 *       required:
 *         - name
 *         - teamId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the coach
 *         name:
 *           type: string
 *           description: The name of the coach
 *         teamId:
 *           type: integer
 *           description: The id of the team the coach belongs to
 *       example:
 *         id: 1
 *         name: John Doe
 *         teamId: 1
 */

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Returns the list of all coaches
 *     responses:
 *       200:
 *         description: The list of coaches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 */
coachRouter.get('/', async (req, res) => {
    try {
        const coaches = await coachService.getAllCoaches();
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving coaches' });
    }
});

export default coachRouter;