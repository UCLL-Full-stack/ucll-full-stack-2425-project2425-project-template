import driverDb from '../repository/Driver.db';
import { Driver } from '../model/Driver';

const getDriverById = async (id: number): Promise<Driver | null> => {
    return driverDb.getDriverById({ driver_id: id });
};

const getAllDrivers = async (): Promise<Driver[]> => {
    const drivers = await driverDb.getAllDrivers();
    return drivers ?? [];
};

export default { getDriverById, getAllDrivers };