import { Driver } from '../model/Driver';
import database from '../util/database';

const getAllDrivers = async ():Promise<Driver[] | null> => {
    try {
        const driversPrisma = await database.driver.findMany();
        return driversPrisma.map((driversPrisma) => Driver.from(driversPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

const getDriverById = async ({ driver_id }: { driver_id: number}): Promise<Driver | null> => {
    try {
        const driverPrisma = await database.driver.findFirst({
        where: { id: driver_id },
      });
      return driverPrisma ? Driver.from(driverPrisma) : null;
    } catch (error) {
      console.error(error);
      throw new Error('Database error. See server logs for details.');
    }
}

const createDriver = async ({ driver }: { driver: Driver }): Promise<Driver | null> => {
    try {
        const driverPrisma = await database.driver.create({
            data: {
                name: driver.getName(),
                surname: driver.getSurname(),
                birthdate: driver.getBirthdate(),
                team: driver.getTeam(),
                country: driver.getCountry(),
                description: driver.getDescription(),
            },
        });

        return Driver.from(driverPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
}

export default { getAllDrivers, createDriver, getDriverById };