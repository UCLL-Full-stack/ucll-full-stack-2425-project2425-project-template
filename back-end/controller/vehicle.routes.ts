import express,{ Request, Response, Router } from 'express';
import vehicleService from "../service/vehicle.service";
import { ca } from 'date-fns/locale';
import { Vehicle } from '../domain/model/vehicle';

const vehicleRouter = express.Router();

vehicleRouter.get('/', async (req: Request, res: Response) => {
    try{
        const vehicles = await vehicleService.getAllCars();
        res.status(200).json(vehicles);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})

vehicleRouter.post('/', async (req: Request, res: Response) => {
    try{
        const vehicle = await vehicleService.addVehicle(req.body);
        res.status(201).json(vehicle);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})

vehicleRouter.get('/:id', async (req, res) => {
    const vehicleId = Number(req.params.id);
    try{
        const vehicle = await vehicleService.getVehicleById(vehicleId);
        res.status(200).json(vehicle);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})  

vehicleRouter.delete('/:id', async (req, res) => {

    const vehicleId = Number(req.params.id);

    try {
        await vehicleService.deleteVehicle(vehicleId);
        res.status(200).json({ status: `Vehicle with ID ${vehicleId} was deleted.` });
    } catch (error) {
        res.status(400).json({ status: 'error something wrong with delete method' }); 
    }
});

vehicleRouter.put('/:id', async (req, res) => {
    const vehicleId = Number(req.params.id);
    const newVehicle = req.body
    try {
        await vehicleService.editVehicle(vehicleId, newVehicle);
        const updatedVehicle = await vehicleService.getVehicleById(vehicleId)
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ status: 'error' }); 
    }
})

vehicleRouter.get('/',async( req: Request, res: Response) => {
    try{
        const filters = req.query;
        const vehicles = await vehicleService.getFilteredVehicles(filters);
        res.status(200).json(vehicles);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})


export default vehicleRouter;