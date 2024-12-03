import express, { Request, Response, NextFunction } from 'express';
import racecarService from '../service/Racecar.service';

const racecarRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Racecars
 *   description: Racecar management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Racecar:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         brand:
 *           type: string
 *         hp:
 *           type: number
 */

/**
 * @swagger
 * /racecars/{id}:
 *   get:
 *     summary: Retrieve a racecar by ID
 *     tags: [Racecars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The racecar ID
 *     responses:
 *       200:
 *         description: A racecar object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Racecar'
 *       404:
 *         description: Racecar not found
 *       500:
 *         description: Internal server error
 */
racecarRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const racecar = await racecarService.getRacecarById(id);
        if (racecar) {
            res.json(racecar);
        } else {
            res.status(404).json({ message: 'Racecar not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { racecarRouter };