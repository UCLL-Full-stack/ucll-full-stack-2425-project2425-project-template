import { Location } from '../model/location';
import database from '../repository/database';
import locationDb from '../repository/location.db';
import { LocationInput } from '../types';

const addLocation = async ({ street, number, city, country }: LocationInput): Promise<Location> => {
    try {
        const location = await locationDb.getLocationByAddress(street, number, city, country);
        if (location) {
            return location;
        }
        return await locationDb.addLocation(
            new Location({
                street,
                number,
                city,
                country,
            })
        );
    } catch (error) {
        throw new Error(`Error:${error}`);
    }
};

export default { addLocation };
