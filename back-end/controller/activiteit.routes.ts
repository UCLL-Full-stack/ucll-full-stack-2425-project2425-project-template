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
 */
import express, {NextFunction, Request, Response} from "express";
import activiteitService from "../service/activiteit.service";
import e from "express";

const activiteitRouter = express.Router();

/**
 * @swagger
 * /activiteit/{groepNaam}:
 *  get:
 *     summary: Geeft alle activiteiten van een groep
 *     parameters:
 *          - in: path
 *            name: groepNaam
 *            schema:
 *             type: string
 *             required: true
 *             description: De naam van de groep waarvan je de activiteiten wilt opvragen
 *     responses:
 *         200:
 *            description: Een array van activiteiten
 *            content:
 *                application/json:
 *                   schema:
 *                     type: array
 *                     items:
 *                        $ref: "#/components/schemas/Activiteit"
 */
activiteitRouter.get("/:groepid", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activiteiten = await activiteitService.getActiviteitenByGroepNaam(String(req.params.groepid));
        res.status(200).json(activiteiten);
    } catch (e) {
        next(e);
    }
});

export {activiteitRouter};