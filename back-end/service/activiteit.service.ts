import groepService from './groep.service';
import {Activiteit} from '../model/activiteit';

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

export default {getActiviteitenByGroepNaam}