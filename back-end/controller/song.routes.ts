/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Song:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Song title.
 *            genre:
 *              type: string
 *              description: Song genre.
 *      SongInput:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              description: Song title.
 *            genre:
 *              type: string
 *              description: Song genre.
 *            user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import songService from '../service/song.service';
import { Role, SongInput, UserInput } from '../types';

const songRouter = express.Router()

/**
 * @swagger
 * /songs:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     summary: Get a list of all songs.
 *     responses:
 *       200:
 *         description: List of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
songRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const request = req as Request & { auth: { role: Role } }
    const { role } = request.auth
    const songs = await songService.getAllSongs({role});
    res.status(200).json(songs)
})

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     summary: Get a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 */
songRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const songId = parseInt(req.params.id);

    try {
        const song = await songService.getSongById({id: songId});
        res.status(200).json(song)
    } catch {
        res.status(404).json({message: `Song with id ${songId} does not exist`})
    }
})

/**
 * @swagger
 * /songs/create:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     summary: Create a song
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Song title.
 *               genre:
 *                 type: string
 *                 description: Song genre.
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: User ID.
 *     responses:
 *       200:
 *         description: Created song
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 */
songRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const songInput = <SongInput>req.body;
        const userInput = <UserInput>req.body.user;

        const song = await songService.createSong(songInput, userInput);
        res.status(200).json(song);
    } catch(error) {
        next(error);
    }
});

/**
 * @swagger
 * /songs/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []  
 *     summary: Delete a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: User ID.
 *     responses:
 *       200:
 *         description: Song successfully deleted.
 *       404:
 *         description: Song with the provided ID does not exist.
 */
songRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userInput = <UserInput>req.body.user;
    const songId = parseInt(req.params.id);

    try {
        const result = await songService.deleteSongById({ id: songId }, userInput);

        if (result) {
            res.status(200).json({ message: `Song with id ${songId} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Song with id ${songId} does not exist.` });
        }
    } catch (error) {
        next(error);
    }
});


export { songRouter }