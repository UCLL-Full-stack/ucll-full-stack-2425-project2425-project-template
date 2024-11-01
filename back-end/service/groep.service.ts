import groepDB from "../repository/groep.db";
import { Groep } from "../model/groep";

const getGroepByNaam = async (naam: string): Promise<Groep | undefined> => {
    return await groepDB.getGroepByNaam(naam);
}

const getAllGroepen = async (): Promise<Groep[] | undefined> => {
    return await groepDB.getAllGroepen();
}

export default {getGroepByNaam, getAllGroepen}