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
            throw new Error(`Geen activiteiten, voor ${groepNaam} gevonden`);
        }
        return activiteiten;
    }
}

const getAllActiviteiten = async (): Promise<Activiteit[]> => {
    const groepen = await groepService.getAllGroepen();
    const activiteiten: Activiteit[] = [];

    if (groepen === undefined){
        throw new Error('Er zijn geen groepen gevonden');
    }
    else {
        groepen.forEach(groep => {
            const groepActiviteiten = groep.getActiviteiten();
            if (groepActiviteiten === undefined || groepActiviteiten.length === 0) {
                throw new Error(`Geen activiteiten gevonden`);
            }

            groepActiviteiten.forEach(activiteit => activiteiten.push(activiteit));
        });
    }
    return activiteiten;
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

export default {getActiviteitenByGroepNaam, getAllActiviteiten, addActiviteit};