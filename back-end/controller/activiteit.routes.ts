/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Activiteit:
 *          type: object
 *          properties:
 *             id:
 *              type: number
 *              format: int64
 *             naam:
 *              type: string
 *              description: De naam van de activiteit
 *             beschrijving:
 *              type: string
 *              description: De beschrijving van de activiteit
 *             begindatum:
 *              type: date
 *              format: date-time
 *              description: De begindatum van de activiteit
 *             einddatum:
 *              type: date
 *              format: date-time
 *              description: De einddatum van de activiteit
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
 *         activiteiten:
 *          type: array
 *          items:
 *           $ref: "#/components/schemas/Activiteit"
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
import activiteitService from "../service/activiteit.service";
import { Activiteit } from "../model/activiteit";

const activiteitRouter = express.Router();

/**
 * @swagger
 * /activiteit/{groepNaam}:
 *  post:
 *   summary: Voeg een activiteit toe aan een groep
 *   tags:
 *    - activiteit
 *   parameters:
 *         - in: path
 *           name: groepNaam
 *           schema:
 *             type: string
 *             required: true
 *             description: De naam van de groep waaraan je de activiteit wilt toevoegen
 *   requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Activiteit"
 *   responses:
 *     200:
 *      description: De toegevoegde activiteit
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Groep"
 *     400:
 *      description: Fout in de request
 *     404:
 *      description: Groep niet gevonden/Activiteit niet correct
 */
activiteitRouter.post("/:groepNaam", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activiteit = new Activiteit ({
            id: req.body.id,
            naam: req.body.naam,
            beschrijving: req.body.beschrijving,
            begindatum: new Date(req.body.begindatum),
            einddatum: new Date(req.body.einddatum)
        });
        const result = await activiteitService.addActiviteit(activiteit, String(req.params.groepNaam));
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /activiteit/{groepNaam}:
 *  put:
 *   summary: Verander een activiteit
 *   tags:
 *    - activiteit
 *   parameters:
 *         - in: path
 *           name: groepNaam
 *           schema:
 *             type: string
 *             required: true
 *             description: De naam van de groep waarvan je de activiteit wilt veranderen
 *   requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Activiteit"
 *   responses:
 *     200:
 *      description: De veranderde activiteit
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Activiteit"
 *     400:
 *      description: Fout in de request
 *     404:
 *      description: Groep niet gevonden/Activiteit niet gevonden
 */
activiteitRouter.put("/:groepNaam", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activiteit = new Activiteit ({
            id: req.body.id,
            naam: req.body.naam,
            beschrijving: req.body.beschrijving,
            begindatum: new Date(req.body.begindatum),
            einddatum: new Date(req.body.einddatum)
        });
        const result = await activiteitService.updateActiviteit(activiteit, String(req.params.groepNaam));
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /activiteit/{groepNaam}/{activiteitId}:
 *  delete:
 *      summary: Verwijder een activiteit
 *      tags:
 *        - activiteit
 *      parameters:
 *        - in: path
 *          name: groepNaam
 *          schema:
 *              type: string
 *              required: true
 *              description: De naam van de groep waarvan je de activiteit wilt verwijderen
 *        - in: path
 *          name: activiteitId
 *          schema:
 *              type: number
 *              required: true
 *              description: Het id van de activiteit die je wilt verwijderen
 *      responses:
 *          200:
 *              description: De verwijderde activiteit
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Activiteit"
 *          400:
 *              description: Fout in de request
 *          404:
 *              description: Groep niet gevonden/Activiteit niet gevonden
 *  
 */
activiteitRouter.delete("/:groepNaam/:activiteitId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await activiteitService.deleteActiviteit(req.params.groepNaam, Number(req.params.activiteitId));
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

export {activiteitRouter};