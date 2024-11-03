/**
 *  @swagger
 *      components:
 *      securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      schemas:
 *          Artist:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: number
 *                      format: int64
 *                  name:
 *                      type: string
 *                  bio: 
 *                      type: string
 *          Duration:
 *              type: object
 *              properties:
 *                  hours: 
 *                      type: number
 *                  minutes: 
 *                      type: number
 *                  seconds: 
 *                      type: number
 *          Song:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  title:
 *                      type: string
 *                  duration:
 *                      $ref: '#/components/schemas/Duration'
 *                  artists:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Artist'
 *          Album:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  title:
 *                      type: string
 *                  duration:
 *                      $ref: '#/components/schemas/Duration'
 *                  artists:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Artist'
 *                  songs:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Song'
 *                  releaseDate:
 *                      type: string
 *                      format: date
 */
import express, { NextFunction, Request, Response } from 'express';
import albumService from '../service/albumService';

const albumRouter = express.Router();
/**
*   @swagger
*   /albums:
*       get:
*           summary: Get a list of all Albums.
*           responses:
*               200:
*                   description: A list of Album objects
*                   content:
*                       application/json:
*                           schema:
*                           $ref: '#/components/schemas/Album'
*/
albumRouter.get('/', async (req: Request, res: Response, next: NextFunction)=>{
    const albums = albumService.getAlbums();
    res.status(200).json(albums);
});

/**
*   @swagger
*   /albums/{id}:
*       get:
*           summary: Get an Album by id
*           parameters:
*               - in: path
*                 name: id
*                 schema:
*                   type: integer
*                 required: true
*                 description: id of Album
*           responses:
*               200:
*                   description: an Album objects
*                   content:
*                       application/json:
*                           schema:
*                           $ref: '#/components/schemas/Album'
*/
albumRouter.get('/:id', async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const albums = albumService.getAlbumById(Number(req.params['id']));
        res.status(200).json(albums);
    }catch(e){
        next(e);
    }
});

export { albumRouter }
