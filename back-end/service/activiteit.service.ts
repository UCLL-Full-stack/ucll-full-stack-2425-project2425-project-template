import groepService from './groep.service';
import {Activiteit} from '../model/activiteit';

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

export default {getActiviteitenByGroepNaam, getAllActiviteiten}