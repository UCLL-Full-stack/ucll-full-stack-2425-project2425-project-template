import groepDB from "../repository/groep.db";
import { Groep } from "../model/groep";

const getGroepByNaam = async (naam: string): Promise<Groep | undefined> => {
    return await groepDB.getGroepByNaam(naam);
}

export default {getGroepByNaam}