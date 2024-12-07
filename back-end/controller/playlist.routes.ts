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
 *            user:
 *              $ref: '#/components/schemas/User'
 *      PlaylistInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            user:
 *              id:
 *                  type: number
 *                  format: int64
 *      AddSongInput:
 *          type: object
 *          properties:
 *              playlist:
 *                type: object
 *                properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *              songs:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         id:
 *                            type: number
 *                            format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import playlistService from '../service/playlist.service';
import { AddSongInput, PlaylistInput, Role } from '../types';

const playlistRouter = express.Router()

/**
 * @swagger
 * /playlists:
 *   get:
 *     security:
 *       - bearerAuth: []
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
    try {
        const request = req as Request & { auth: {username: string, role: Role} }
        const { username, role } = request.auth;
        const playlists = await playlistService.getAllPlaylists({username, role})
        res.status(200).json(playlists)
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []  
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
 * /playlists/addSong:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: add song to your playlist.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AddSongInput'
 *      responses:
 *         200:
 *            description: The playlist with songs.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Song'
 */
playlistRouter.post('/addSong', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = <AddSongInput>req.body;
        const result = await playlistService.addSongToPlaylist(playlist);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// /**
//  * @swagger
//  * /playlists/create:
//  *   post:
//  *     security:
//  *       - bearerAuth: []
//  *     summary: create playlist
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PlaylistInput'
//  *     responses:
//  *       200:
//  *         description: created playlist
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Playlist'
// */
// playlistRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const playlistInput = <PlaylistInput>req.body;
//         const playlist = await playlistService.createPlaylist(playlistInput);
//         res.status(200).json(playlist);
//     } catch(error) {
//         next(error)
//     }
// })


/**
 * @swagger
 * /playlists/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create playlist
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: ID of the playlist
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
    } catch (error) {
        next(error);
    }
});

export { playlistRouter };