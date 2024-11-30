/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      GroupChat:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description: 
 *              type: string
 *            createdAt:
 *              type: Date
 *              
 * 
 */

import express, { Request, Response,NextFunction } from 'express';
import groupchatservice from '../service/groupchat.service';
import { GroupChatInput } from '../types';
const groupchatRouter = express.Router();

/**
 * @swagger
 * /groupchats:
 *   get:
 *     summary: Get all group chats
 *     tags: [GroupChats]
 *     responses:
 *       200:
 *         description: The list of chats.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupChat'
 */

groupchatRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
try {
    const groupchats = await groupchatservice.getAllGroupChats();
    res.json(groupchats);
  } catch (error) {
    next(error);
  }
}
);


/**
 * @swagger
 * /groupchats/{id}:
 *   get:
 *     summary: Get group chat by id
 *     tags: [GroupChats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Group chat id
 *     responses:
 *       200:
 *         description: The group chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupChat'
 *       404:
 *         description: Group chat not found
 */

groupchatRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupchat = await groupchatservice.getGroupChatById({ id: parseInt(req.params.id) });
    res.json(groupchat);
  } catch (error) {
    next(error);
  }
}
);


/**
 * @swagger
 * /groupchats:
 *   post:
 *     summary: Create a new group chat
 *     tags: [GroupChats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupChat'
 *     responses:
 *       200:
 *         description: The group chat was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupChat'
 *       500:
 *         description: Some server error
 */

groupchatRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupChatInput: GroupChatInput = req.body;
    console.log(req.body);
    const groupChat = await groupchatservice.createGroupChat(groupChatInput);
    res.json(groupChat);
  } catch (error) {
    next(error);
  }
}
);

export { groupchatRouter };