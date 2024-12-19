/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the trainer
 *         name:
 *           type: string
 *           description: Trainer's name
 *         user:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: First name of the user
 *             lastName:
 *               type: string
 *               description: Last name of the user
 *             email:
 *               type: string
 *               description: Email of the user
 *         pokemon:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pokemon'
 *     Pokemon:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the Pokemon
 *         type:
 *           type: string
 *           description: Type of the Pokemon (e.g., fire, water)
 *         health:
 *           type: number
 *           description: Health points of the Pokemon
 *         canEvolve:
 *           type: boolean
 *           description: if the pokemon can evolve
 *         stats:
 *           type: object
 *           properties:
 *             hp:
 *               type: number
 *               description: Health points of the Pokemon
 *             attack:
 *               type: number
 *               description: Attack power of the Pokemon
 *             defence:
 *               type: number
 *               description: Defence power of the Pokemon
 *             specialAttack:
 *               type: number
 *               description: Special attack power of the Pokemon
 *             specialDefence:
 *               type: number
 *               description: Special defence power of the Pokemon
 *             speed:
 *               type: number
 *               description: Speed of the Pokemon
 */
import express, { NextFunction, Request, response, Response } from 'express';
import trainerService from '../service/trainer.service';
import { PokemonInput, Trainer, Userinput } from '../types';

const trainerRouter = express.Router();

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Retrieve a list of all trainers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trainers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trainer'
 *       500:
 *         description: Server error
 */
trainerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainers = await trainerService.getAllTrainers();
        res.status(200).json(trainers);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /trainers/email:
 *   get:
 *     summary: Get a trainer by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query    
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the trainer
 *     responses:
 *       200:
 *         description: A trainer object corresponding to the provided email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       404:
 *         description: Trainer with the s  pecified email not found
 *       500:
 *         description: Server error
 */
trainerRouter.get('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.query; // Get email from query parameters

        // Validate email parameter
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Email is required and should be a string.' });
        }

        // Fetch the trainer by email using the service
        const trainer = await trainerService.getTrainerByEmail(email as string); // Make sure email is treated as a string

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer with the specified email not found' });
        }

        // Return the trainer object
        res.status(200).json(trainer);
    } catch (error) {
        next(error); // Global error handling
    }
});




/**
 * @swagger
 * /trainers/{id}:
 *   post:
 *     summary: Add a new Pokemon to a specific trainer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The numeric ID of the trainer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       200:
 *         description: Pokemon successfully added to the trainer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Invalid input or data
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
trainerRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokemon = <PokemonInput>req.body;
        const result = await trainerService.addPokemonToTrainerById(Number(req.params.id),pokemon)
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message:error.message})
        } else {
            next(error)         
        }
    }
})

/**
 * @swagger
 * /trainers/pokemon/{idPokemon}/nurse/{idNurse}:
 *   put:
 *     summary: Remove a Pokémon from a Trainer and add it to a Nurse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPokemon
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Pokémon to be removed
 *       - in: path
 *         name: idNurse
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Nurse to add the Pokémon to
 *     responses:
 *       200:
 *         description: Successfully removed Pokémon from Trainer and added to Nurse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       400:
 *         description: Invalid input or data
 *       404:
 *         description: Trainer or Pokémon not found
 *       500:
 *         description: Server error
 */
trainerRouter.put('/pokemon/:idPokemon/nurse/:idNurse', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPokemon, idNurse } = req.params;

        // Validate the parameters
        if (isNaN(Number(idPokemon)) || isNaN(Number(idNurse))) {
            return res.status(400).json({ message: 'Both Pokemon ID and Nurse ID must be valid numbers.' });
        }

        const updatedTrainer = await trainerService.removePokemonAndAddToNurse(
            Number(idPokemon),
            Number(idNurse),
        );

        res.status(200).json(updatedTrainer);  // Respond with the updated trainer
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            next(error); // Pass other errors to the error handler
        }
    }
});



import userService from '../service/user.service'; // Ensure correct import path

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: Successfully fetched all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });
  

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user with username and password.
 *     description: Returns a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const authResponse = await userService.authenticate({ email, password });
    res.status(200).json({
      message: "Authentication successful",
      response: authResponse,
    });
  } catch (error) {
    next(error);
  }
});

export { userRouter };




import nurseService from '../service/nurse.service';  // Assuming the service file is nurseService

const nurseRouter = express.Router();

/**
 * @swagger
 * /nurses/{email}:
 *   get:
 *     summary: Retrieve a nurse by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the nurse
 *     responses:
 *       200:
 *         description: A nurse object corresponding to the provided email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nurse'
 *       404:
 *         description: Nurse with the specified email not found
 *       500:
 *         description: Server error
 */

nurseRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params; // Get nurse ID from URL parameters
    const nurse = await nurseService.getNurseByEmail(String(email)); // Fetch nurse by ID

    if (!nurse) {
      return res.status(404).json({ message: 'Nurse with the specified ID not found' });
    }

    // Return the nurse object
    res.status(200).json(nurse);
  } catch (error) {
    next(error); // Global error handling
  }
});


import { PrismaClient } from '@prisma/client';
import database from '../util/database';

const prisma = new PrismaClient();

/**
 * @swagger
 * /nurses/{nurseId}/heal/{pokemonId}:
 *   put:
 *     summary: Heal a Pokémon using a Nurse and reset its health to stats.hp
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nurseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Nurse performing the heal
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Pokémon to heal
 *     responses:
 *       200:
 *         description: Pokémon healed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Pokemon healed successfully by Nurse"
 *               pokemon:
 *                 id: 1
 *                 name: "Pikachu"
 *                 type: "Electric"
 *                 stats:
 *                   hp: 35
 *                   attack: 55
 *                   defence: 40
 *                   specialAttack: 50
 *                   specialDefence: 50
 *                   speed: 90
 *                 health: 35
 *                 canEvolve: true
 *                 healedBy: 2
 *       404:
 *         description: Pokémon or Nurse not found
 *       500:
 *         description: Server error
 */
nurseRouter.put('/:nurseId/heal/:pokemonId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nurseId, pokemonId } = req.params;

        // Validate Nurse existence
        const nurse = await prisma.nurse.findUnique({
            where: { id: Number(nurseId) },
        });

        if (!nurse) {
            return res.status(404).json({ message: `Nurse with ID ${nurseId} not found.` });
        }

        // Fetch the Pokémon and its stats
        const pokemonWithStats = await prisma.pokemon.findUnique({
            where: { id: Number(pokemonId) },
            include: { stats: true },
        });

        if (!pokemonWithStats) {
            return res.status(404).json({ message: `Pokemon with ID ${pokemonId} not found.` });
        }

        // Update Pokémon's health to match its stats.hp
        const updatedPokemon = await prisma.pokemon.update({
            where: { id: Number(pokemonId) },
            data: {
                health: pokemonWithStats.stats.hp,
            },
        });

        // Return the healed Pokémon details
        res.status(200).json({
            message: "Pokemon healed successfully by Nurse",
            pokemon: {
                id: updatedPokemon.id,
                name: updatedPokemon.name,
                type: updatedPokemon.type,
                stats: pokemonWithStats.stats,
                health: updatedPokemon.health,
                canEvolve: updatedPokemon.canEvolve,
                healedBy: nurseId, // Optional
            },
        });
    } catch (error) {
        next(error);
    }
});




/**
 * @swagger
 * /trainers/pokemon/{idPokemon}:
 *   post:
 *     summary: Add a new Pokémon to the trainer of that Pokémon (using previousTrainerId)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPokemon
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Pokémon to add to its previous trainer
 *     responses:
 *       200:
 *         description: Pokémon successfully added to the trainer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       400:
 *         description: Invalid input or data
 *       404:
 *         description: Pokémon or previous trainer not found
 *       500:
 *         description: Server error
 */
trainerRouter.post('/pokemon/:idPokemon', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idPokemon = Number(req.params.idPokemon);

        // Validate the Pokémon ID
        if (isNaN(idPokemon)) {
            return res.status(400).json({ message: 'Pokémon ID must be a valid number.' });
        }

        // Retrieve Pokémon from the database, including the `previousTrainerId` and `nurse`
        const pokemon = await database.pokemon.findUnique({
            where: { id: idPokemon },
            include: { nurse: true }, // Only include relationships like nurse
        });

        // If Pokémon doesn't exist, return a 404 error
        if (!pokemon) {
            return res.status(404).json({ message: `Pokémon with ID ${idPokemon} not found.` });
        }

        // Ensure Pokémon has a `previousTrainerId` and is assigned to a Nurse
        if (!pokemon.previousTrainerId) {
            return res.status(404).json({ message: `Pokémon with ID ${idPokemon} is not associated with any trainer.` });
        }

        if (!pokemon.nurseId) {
            return res.status(404).json({ message: `Pokémon with ID ${idPokemon} is not assigned to any Nurse.` });
        }

        // Now call the service to add the Pokémon to the Trainer using `previousTrainerId`
        const updatedTrainer = await nurseService.addPokemonToTrainer(idPokemon, pokemon.previousTrainerId);

        // Return the updated trainer object if successful
        res.status(200).json(updatedTrainer);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });  // Return generic server error
        }

        next(error); // Pass other errors to the global error handler
    }
});






/**
 * @swagger
 * /nurses/pokemon/{pokemonId}:
 *   delete:
 *     summary: Remove a Pokémon from a Nurse and disassociate it
 *     security:
 *       - bearerAuth: []
 *     parameters:

 *       - in: path
 *         name: pokemonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Pokémon to be removed from the Nurse
 *     responses:
 *       200:
 *         description: Successfully removed Pokémon from Nurse
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pokemon removed from nurse"
 *                 updatedNurse:
 *                   $ref: '#/components/schemas/Nurse'
 *       404:
 *         description: Pokémon not found or not assigned to any Nurse
 *       500:
 *         description: Server error
 */
nurseRouter.delete('/pokemon/:pokemonId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nurseId, pokemonId } = req.params;
        // Logic to remove the Pokémon from the nurse's care
        const updatedNurse = await nurseService.removePokemonFromNurse(Number(pokemonId));
        res.status(200).json({ message: 'Pokemon removed from nurse', updatedNurse });
    } catch (error) {
        next(error);
    }
});


export { nurseRouter };



/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user account in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, nurse, guest]
 *                 description: Role of the user
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the user
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   description: Role of the user
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the user was created
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/signup', async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const UserInput = <Userinput>req.body;
        const user = await userService.createUser(UserInput);
        res.status(200).json(user);
    } catch(error){
        next(error);
    }
  
  
  });

export {trainerRouter};