import groepDB from "../repository/groep.db";
import { Groep } from "../model/groep";
import { Activiteit } from "../model/activiteit";
import { capitalizeFirstLetter } from "../util/stringUtils";
import leidingDb from "../repository/leiding.db";
import { Leiding, PublicLeiding } from "../model/leiding";

const getAllGroepen = async (): Promise<Groep[] | undefined> => {
    const groepen = await groepDB.getAllGroepen();
    return groepen.slice(1);
}

const getActiviteitenForGroep = async (naam: string): Promise<Activiteit[] | undefined> => {
    const standard = capitalizeFirstLetter(naam);
    const groep = await groepDB.getGroepByNaam({naam: standard});
    if (!groep) {
        throw new Error('Groep not found');
    }
    return await groepDB.getActiviteitenByGroep(groep);
}

const addActiviteitToGroep = async (naam: string, activiteit: Activiteit): Promise<Groep | undefined> => {
    const standard = capitalizeFirstLetter(naam);
    const groep = await groepDB.getGroepByNaam({naam: standard});
    if (!groep) {
        throw new Error('Groep not found');
    }
    return await groepDB.addActiviteitToGroep({groep, activiteit});
}

const getGroepByNaam = async (naam: string): Promise<Groep> => {
    const standard = capitalizeFirstLetter(naam);
    const groep = await groepDB.getGroepByNaam({naam: standard});
    if (!groep) {
        throw new Error('Groep not found');
    }
    return groep;
}

const getLeidingForGroep = async (naam: string): Promise<PublicLeiding[]> => {
    const standard = capitalizeFirstLetter(naam);
    const groep = await groepDB.getGroepByNaam({naam: standard});
    if (!groep || groep === undefined) {
        throw new Error('Groep not found');
    }
    return (await groepDB.getLeidingByGroep(groep)).map(leiding => {return PublicLeiding.from({leiding, groep: groep.getNaam()})});
}

const getGroepById = async (id: number): Promise<Groep> => {
    const groep = await groepDB.getGroepById({id});
    if (!groep) {
        throw new Error('Groep not found');
    }
    return groep;
}

export default {
    getAllGroepen, 
    getActiviteitenForGroep, 
    addActiviteitToGroep, 
    getGroepByNaam,
    getLeidingForGroep,
    getGroepById
};