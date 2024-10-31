/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Playlist:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Playlist name.
 *            totalNumbers:
 *              type: number
 *              description: total numbers in the playlist
 *      PlaylistInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import playlistService from '../service/playlist.service';
import { PlaylistInput } from '../types';

const playlistRouter = express.Router()

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get a list of all playlists.
 *     responses:
 *       200:
 *         description: List of playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
playlistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const playlists = playlistService.getAllPlaylists()
    res.status(200).json(playlists)
})

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Get a playlist by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A playlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
playlistRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const playlistId = parseInt(req.params.id);

    try {
        const playlist = await playlistService.getPlaylistById({ id: playlistId});
        res.status(200).json(playlist)
    } catch (error) {
        res.status(404).json( { message: `Playlist with id ${playlistId} does not exist`})
    }
})

/**
 * @swagger
 * /playlists/{playlistId}/{songId}:
 *   put:
 *     summary: Get a Playlist by ID.
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A Playlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
playlistRouter.put('/:playlistId/:songId', async (req: Request, res: Response, next: NextFunction) => {
    const playlistId = parseInt(req.params.playlistId)
    const songId = parseInt(req.params.songId)

    try {
        const addSongtToPlaylist = await playlistService.addSongToPlaylist({playlistId: playlistId, songId: songId})
        res.status(200).json(addSongtToPlaylist)
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /playlists/create:
 *   post:
 *     summary: create playlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaylistInput'
 *     responses:
 *       200:
 *         description: created playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
*/
playlistRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlistInput = <PlaylistInput>req.body;
        const playlist = await playlistService.createPlaylist(playlistInput);
        res.status(200).json(playlist);
    } catch(error) {
        next(error)
    }
})

export { playlistRouter };