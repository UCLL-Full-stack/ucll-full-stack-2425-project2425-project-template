import groepService from './groep.service';
import {Activiteit} from '../model/activiteit';
import activiteitDB from '../repository/activiteit.db';
import { Groep } from '../model/groep';

const getActiviteitenByGroepNaam = async (groepNaam: string): Promise<Activiteit[]> => {
    const groep = await groepService.getGroepByNaam(groepNaam);
    if (groep === undefined) {
        throw new Error(`Groep met naam ${groepNaam} werd niet gevonden`);
    }else{
        const activiteiten = groep.getActiviteiten();
        if (activiteiten === undefined || activiteiten.length === 0) {
            throw new Error(`Geen activiteite, voor ${groepNaam} gevonden`);
        }
        return activiteiten;
    }
}

const addActiviteit = async (activiteit: Activiteit, groepNaam: string): Promise<Activiteit []> => {
    const groep = await groepService.getGroepByNaam(groepNaam);
    if (groep === undefined) {
        throw new Error(`Groep met naam ${groepNaam} werd niet gevonden`);
    }else{
        if (activiteit === undefined || activiteit.getNaam() === undefined || activiteit.getBeschrijving() === undefined || activiteit.getBegindatum() === undefined || activiteit.getEinddatum() === undefined) {
            throw new Error(`Activiteit is niet correct`);
        } else if (activiteit.getBegindatum() > activiteit.getEinddatum()) {
            throw new Error(`Begindatum moet voor einddatum zijn`);
        }
        const nActiviteit = await activiteitDB.addActiviteitToPool(activiteit);
        const nGroep =  await groepService.addActiviteitToGroep(nActiviteit, groep);
        return nGroep.getActiviteiten() || [];
    }
}

export default {getActiviteitenByGroepNaam, addActiviteit};