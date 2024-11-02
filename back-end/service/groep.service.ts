import groepDB from "../repository/groep.db";
import { Groep } from "../model/groep";
import { Activiteit } from "../model/activiteit";

const getGroepByNaam = async (naam: string): Promise<Groep | undefined> => {
    return await groepDB.getGroepByNaam(naam);
}

const addActiviteitToGroep = async (activiteit: Activiteit, groep: Groep): Promise<Groep> => {
    groepDB.addActiviteitToGroep(activiteit, groep);
    return groep;
}

const getAllGroepen = async (): Promise<Groep[] | undefined> => {
    return await groepDB.getAllGroepen();
}

export default {getGroepByNaam, getAllGroepen, addActiviteitToGroep};