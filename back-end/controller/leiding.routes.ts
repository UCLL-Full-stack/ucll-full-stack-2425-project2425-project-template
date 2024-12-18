/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      leiding:
 *          type: object
 *          properties:
 *             id:
 *              type: number
 *              format: int64
 *             naam:
 *              type: string
 *              description: De naam van de leiding
 *             beschrijving:
 *              type: string
 *              description: De beschrijving van de leiding
 *             begindatum:
 *              type: date
 *              format: date-time
 *              description: De begindatum van de leiding
 *             einddatum:
 *              type: date
 *              format: date-time
 *              description: De einddatum van de leiding
 *      Groep:
 *        type: object
 *        properties:
 *         id:
 *          type: number
 *          format: int64
 *         naam:
 *          type: string
 *          description: De naam van de groep
 *         beschrijving:
 *          type: string
 *          description: De beschrijving van de groep
 *         leidingen:
 *          type: array
 *          items:
 *           $ref: "#/components/schemas/leiding"
 *         leiding:
 *          type: array
 *          items:
 *           $ref: "#/components/schemas/Leiding"
 *      Leiding:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *         format: int64
 *        naam:
 *         type: string
 *         description: De naam van de leiding
 *        voornaam:
 *         type: string
 *         description: De voornaam van de leiding
 *        email:
 *         type: string
 *         description: Het emailadres van de leiding
 *        telefoon:
 *         type: string
 *         description: Het telefoonnummer van de leiding
 *        hoodleiding:
 *         type: boolean
 *         description: Of de leiding hoofdleiding is
 *        totem:
 *         type: string
 *         description: De totem van de leiding
 *        groep:
 *         $ref: "#/components/schemas/Groep"
 */
import express, {NextFunction, Request, Response} from "express";
import e from "express";
import leidingService from "../service/leiding.service";
import { Leiding } from "../model/leiding";

const leidingRouter = express.Router();

/**
 * @swagger
 * /leiding/login:
 *  post:
 *   summary: Geeft een token terug als de leiding correct is ingelogd
 *   tags:
 *     - Leiding
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties: 
 *                    totem:
 *                     type: string 
 *                    wachtwoord:
 *                     type: string                  
 *   responses:
 *      200:
 *          description: Een token
 *          content:
 *            application/json:
 *              schema:
 *                  type: string
 */
leidingRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { totem, wachtwoord } = req.body;
        const token = await leidingService.login(totem, wachtwoord);
        res.json(token);
    } catch (e) {
        next(e);
    }
});

export default leidingRouter;