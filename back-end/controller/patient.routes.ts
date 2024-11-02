import express, {NextFunction, Request, Response} from 'express';
import patientService from '../service/patient.service';

const patientRouter = express.Router();

patientRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {

        const patients = await patientService.getPatients();
        res.status(200).json(patients);
    }
    catch (error) {
        next(error);
    }
});

export {patientRouter};
