import groepService from './groep.service';
import {Activiteit} from '../model/activiteit';
import activiteitRepo from '../repository/activiteit.db';
import { Groep } from '../model/groep';

const addActiviteit = async (activiteit: Activiteit, groepNaam: string): Promise<Activiteit> => {
    try {
        const activiteitDB = await activiteitRepo.createActiviteit(activiteit);
        await groepService.addActiviteitToGroep(groepNaam, activiteitDB);
        return activiteitDB;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding an activiteit');
    }
}

const deleteActiviteit = async (groepNaam: string, activiteitId: number): Promise<String> => {
    try {
        if (!activiteitId) {
            throw new Error('Activiteit not found');
        }
        const groepActiviteiten = await groepService.getActiviteitenForGroep(groepNaam);
        if (!groepActiviteiten) {
            throw new Error('Groep not found');
        }
        const dbActiviteit = await activiteitRepo.getActiviteitById({id: activiteitId});
        if (!(groepActiviteiten.includes(dbActiviteit))) {
            throw new Error('Activiteit not found in groep');
        }
        const res = await activiteitRepo.verwijderActiviteit(dbActiviteit);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting an activiteit');
    }
}

const updateActiviteit = async (activiteit: Activiteit, groepNaam: string): Promise<Activiteit> => {
    try {
        const groepActiviteiten = await groepService.getActiviteitenForGroep(groepNaam);
        if (!groepActiviteiten) {
            throw new Error('Groep not found');
        }
        for (const act of groepActiviteiten) {
            if (act.getId() === activiteit.getId()) {
                break;
            }
            throw new Error('Activiteit not found in groep');
        }
        const res = await activiteitRepo.veranderActiviteit(activiteit);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating an activiteit');
    }
}

export default {
    addActiviteit,
    deleteActiviteit,
    updateActiviteit
};