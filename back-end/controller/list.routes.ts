/**
 *  @swagger
 *      components:
 *      securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      schemas:
 *          ListInput:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  albums:
 *                      type: array
 *                      items:
 *                          type: number
 *          List:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  createdAt:
 *                      type: number
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  albums:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Album'
 */
import express, { NextFunction, Request, Response } from 'express';
import listService from '../service/listService';
import { ListInput } from '../types';

const listRouter = express.Router();

/**
*   @swagger
*   /lists:
*       get:
*           summary: Get a list of all Lists.
*           responses:
*               200:
*                   description: A list of List objects
*                   content:
*                       application/json:
*                           schema:
*                           $ref: '#/components/schemas/List'
*/
listRouter.get('/', async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const lists = await listService.getLists();
        res.status(200).json(lists);
    }catch(e){
        next(e);
    }
});

/**
*   @swagger
*   /lists:
*       post:
*           summary: create a new List
*           requestBody:
*               description: new added List
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/ListInput'
*           responses:
*               200:
*                   description: a List object
*                   content:
*                       application/json:
*                           schema:
*                           $ref: '#/components/schemas/List'
*/
listRouter.post('/', async (req: Request, res: Response, next: NextFunction)=>{
    const list  = <ListInput> req.body;
    try{
        const newList = await listService.createList(list);
        res.status(200).json(newList);
    }catch(e){
        next(e);
    }
});

listRouter.get('/:id', async (req: Request, res: Response, next: NextFunction)=>{
    const id = Number(req.params["id"]);

    try{
        const lists = await listService.getUserLists(id);
        res.status(200).json(lists);
    }catch(e){
        next(e); 
    }
});

listRouter.delete('/:id', async (req:Request, res:Response, next: NextFunction)=>{
    const id = Number(req.params["id"]);

    try{
        await listService.deleteList(id);
        res.status(200);
    }catch(e){
        next(e); 
    }
});

export { listRouter }
