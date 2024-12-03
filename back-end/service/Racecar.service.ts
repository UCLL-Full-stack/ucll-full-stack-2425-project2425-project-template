import racecarDb from '../repository/Racecar.db';
import { Racecar } from '../model/racecar';

const getRacecarById = async (id: number): Promise<Racecar | null> => {
    return racecarDb.getRacecarById(id);
};

export default { getRacecarById };