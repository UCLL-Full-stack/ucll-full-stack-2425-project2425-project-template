/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Build:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            parts:
 *              type: array
 *              description: List of parts in build
 *            price:
 *              type: number
 *              description: Build price
 *            preBuild:
 *              type: boolean
 */
import express, { NextFunction, Request, Response } from 'express';
import buildService from '../service/build.service';

const buildRouter = express.Router();

/**
 * @swagger
 * /builds:
 *   get:
 *     summary: Get a list of all builds.
 *     responses:
 *       200:
 *         description: A list of builds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Build'
 */
buildRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const builds = await buildService.getAllBuilds();
        res.status(200).json(builds);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /builds/{id}:
 *  get:
 *      summary: Get a build by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The build id.
 *      responses:
 *          200:
 *              description: A build object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Build'
 */
buildRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const build = await buildService.getBuildById(Number(req.params.id));
        res.status(200).json(build);
    } catch (error) {
        next(error);
    }
});

export { buildRouter };
