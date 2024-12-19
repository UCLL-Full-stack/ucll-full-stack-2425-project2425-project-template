/**
 * @swagger
 * tags: 
 * name: Nieuwsbericht
 * description: API voor nieuwsberichten
 * components:
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
 *        nieuwsberichten:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Nieuwsbericht"
 *        wachtwoord:
 *          type: string
 *          description: Het wachtwoord van de leiding
 *        rol:
 *          type: string
 *          description: De rol van de leiding
 *      Nieuwsbericht:
 *        type: object
 *        properties:
 *         id:
 *          type: number
 *          format: int64
 *         titel:
 *           type: string
 *           description: De titel van het nieuwsbericht
 *         inhoud:
 *           type: string
 *           description: De inhoud van het nieuwsbericht
 *         datum:
 *           type: date
 *           format: date-time
 *           description: De datum van het nieuwsbericht
 *         leiding:
 *          $ref: "#/components/schemas/PublicLeiding"
 *      PublicLeiding:
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
 *          type: string
 *          description: Het emailadres van de leiding
 *        telefoon:
 *          type: string
 *          description: Het telefoonnummer van de leiding
 *        totem:
 *          type: string
 *          description: De totem van de leiding
 *        rol:
 *          type: string
 *          description: De rol van de leiding
 *        groepId:
 *          type: number
 *          format: int64
 *          description: Het id van de groep van de leiding
 *      PublicNieuwsbericht:
 *       type: object
 *       properties:
 *        id:
 *         type: number
 *         format: int64
 *        titel:
 *         type: string
 *         description: De titel van het nieuwsbericht
 *        inhoud:
 *         type: string
 *         description: De inhoud van het nieuwsbericht
 *        datum:
 *         type: date
 *         format: date-time
 *         description: De datum van het nieuwsbericht
 *        auteur:
 *         type: string
 *         description: De auteur van het nieuwsbericht
 */
import express, {NextFunction, Request, Response} from "express";
import { Rol } from "../types";
import jwt from "jsonwebtoken";
import { Nieuwsbericht } from "../model/nieuwsbericht";
import nieuwsberichtService from "../service/nieuwsbericht.service";
import { time } from "console";
import { da } from "date-fns/locale";

const nieuwsberichtRouter = express.Router();

/**
 * @swagger
 * /nieuwsberichten:
 *  get:
 *   summary: Geeft alle nieuwsberichten terug
 *   tags:
 *    - Nieuwsbericht
 *   responses:
 *    200:
 *     description: Een array van nieuwsberichten
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: "#/components/schemas/PublicNieuwsbericht"
 *    400:
 *     description: Er is iets misgelopen
 *    404:
 *     description: Geen nieuwsberichten gevonden
 */
nieuwsberichtRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nieuwsberichten = await nieuwsberichtService.getAllNieuwsberichten();
        res.json(nieuwsberichten);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /nieuwsberichten:
 *  post:
 *   summary: Maakt een nieuw nieuwsbericht aan
 *   tags:
 *    - Nieuwsbericht
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          $ref: "#/components/schemas/Nieuwsbericht"
 *   responses:
 *    200: 
 *       description: Het aangemaakte nieuwsbericht
 *       content:
 *        application/json:
 *         schema:
 *           $ref: "#/components/schemas/PublicNieuwsbericht"
 *    400:
 *     description: Er is iets misgelopen
 *    401:
 *     description: Niet geautoriseerd
 *    404:
 *     description: Nieuwsbericht niet gevonden  
 */
nieuwsberichtRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
    
        const secret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token? token: "", secret) as { totem: string, rol: Rol};
        const nieuwsbericht = new Nieuwsbericht({
            id: 0,
            titel: req.body.titel, 
            inhoud: req.body.inhoud, 
            datum: new Date(),
            auteur: 0
        });
        const newNieuwsbericht = await nieuwsberichtService.createNieuwsbericht(nieuwsbericht, decoded.totem, decoded.rol);
        res.json(newNieuwsbericht);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /nieuwsberichten:
 *   put:
 *    summary: Update een nieuwsbericht
 *    tags:
 *     - Nieuwsbericht
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/PublicNieuwsbericht"
 *    responses:
 *     200:
 *      description: Het geüpdatete nieuwsbericht
 *      content:
 *        application/json:
 *         schema:
 *           $ref: "#/components/schemas/PublicNieuwsbericht"
 *     400:
 *      description: Er is iets misgelopen
 *     401:
 *      description: Niet geautoriseerd
 * 
 */
nieuwsberichtRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

    
        const secret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token? token: "", secret) as { totem: string, rol: Rol};
        const nieuwsbericht = new Nieuwsbericht({
            id: req.body.id,
            titel: req.body.titel, 
            inhoud: req.body.inhoud, 
            datum: req.body.datum,
            auteur: 0
        });
        const newNieuwsbericht = await nieuwsberichtService.updateNieuwsbericht(nieuwsbericht, decoded.totem, decoded.rol);
        res.json(newNieuwsbericht);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /nieuwsberichten/{id}:
 *   delete:
 *    summary: Verwijder een nieuwsbericht
 *    tags:
 *     - Nieuwsbericht
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path 
 *       name: id
 *       required: true
 *       schema:
 *        type: integer
 *        format: int64
 *    responses:
 *     200:
 *      description: Het nieuwsbericht is verwijderd
 *     400:
 *      description: Er is iets misgelopen
 *     401: 
 *      description: Niet geautoriseerd
 *     404:
 *      description: Nieuwsbericht niet gevonden
 */
nieuwsberichtRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        const secret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token? token: "", secret) as { totem: string, rol: Rol};
        await nieuwsberichtService.deleteNieuwsbericht(Number(req.params.id), decoded.totem, decoded.rol);
        res.json({message: 'Nieuwsbericht verwijderd'});
    } catch (error) {
        next(error);
    }
});

export default nieuwsberichtRouter;