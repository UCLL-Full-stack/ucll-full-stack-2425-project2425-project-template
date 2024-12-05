import { Location } from '../model/location';
import database from './database';

const addLocation = async (location: Location): Promise<Location> => {
    try {
        const result = await database.location.create({
            data: {
                street: location.getStreet(),
                number: location.getNumber(),
                city: location.getCity(),
                country: location.getCountry(),
            },
        });
        return Location.from(result);
    } catch (error) {
        console.log(error);
        throw new Error(`Error: ${error}`);
    }
};

const getLocationById = async (id: number): Promise<Location> => {
    try {
        const result = await database.location.findUnique({ where: { id: id } });
        if (!result) {
            throw new Error(`No location with id ${id} found`);
        }
        return Location.from(result);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server logs for more detail');
    }
};

const getLocationByAddress = async (
    street: string,
    number: number,
    city: string,
    country: string
): Promise<Location | null> => {
    const result = await database.location.findFirst({
        where: {
            street: street,
            number: number,
            city: city,
            country: country,
        },
    });
    return result ? Location.from(result) : null;
};

export default {
    addLocation,
    getLocationByAddress,
    getLocationById,
};
