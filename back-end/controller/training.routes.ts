import { Router } from 'express';
// import trainingService from '../service/training.service';
// import { TrainingInput } from '../types';



const trainingRouter = Router();

// trainingRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const training = <TrainingInput>req.body;
//         const result = await trainingService.addTraining(training);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });


// trainingRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const trainings = await trainingService.getAllTrainings();
//         res.status(200).json(trainings);
//     } catch (error) {
//         next(error);
//     }
// });

export { trainingRouter };