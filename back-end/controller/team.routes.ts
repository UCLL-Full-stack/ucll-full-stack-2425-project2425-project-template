import { Router } from 'express';
// import teamService from '../service/team.service';
// import { TeamInput } from '../types';



const teamRouter = Router();

// teamRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const team = <TeamInput>req.body;
//         const result = await teamService.createTeam(team);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

// teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const teams = await teamService.getAllTeams();
//         res.status(200).json(teams);
//     } catch (error) {
//         next(error);
//     }
// });

export { teamRouter };