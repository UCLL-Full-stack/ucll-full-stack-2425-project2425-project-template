import driverDb from '../repository/Driver.db';
import { Driver } from '../model/driver';

const getDriverById = async (id: number): Promise<Driver | null> => {
    return driverDb.getDriverById({ driver_id: id });
};

export default { getDriverById };