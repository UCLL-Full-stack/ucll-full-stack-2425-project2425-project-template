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
 */

import express, { NextFunction, Request, Response } from 'express';
import songService from '../service/song.service';
import { SongInput } from '../types';

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
songRouter.get('/', async (req: Request , auth:any, res: Response, next: NextFunction) => {
    const songs = songService.getAllSongs();
    res.status(200).json(songs)
})

/**
 * @swagger
 * /songs/{id}:
 *   get:
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
        const song = songService.getSongById({id: songId});
        res.status(200).json(song)
    } catch {
        res.status(404).json({message: `Song with id ${songId} does not exist`})
    }
})

/**
 * @swagger
 * /songs/create:
 *   post:
 *     summary: create song
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongInput'
 *     responses:
 *       200:
 *         description: created song
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
*/
songRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const songInput = <SongInput>req.body;
        const song = songService.createSong(songInput);
        res.status(200).json(song)
    } catch(error) {
        next(error)
    }
})

export { songRouter }