import racecarDb from '../repository/Racecar.db';
import { Racecar } from '../model/Racecar';

const getRacecarById = async (id: number): Promise<Racecar | null> => {
    return racecarDb.getRacecarById(id);
};

const getAllRacecars = async (): Promise<Racecar[]> => {
    const racecars = await racecarDb.getAllRacecars();
    return racecars ?? [];
};

export default { getRacecarById, getAllRacecars };