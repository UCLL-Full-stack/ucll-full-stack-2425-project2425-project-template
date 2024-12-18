import groepService from './groep.service';
import {Activiteit} from '../model/activiteit';
import activiteitRepo from '../repository/activiteit.db';
import { Rol } from '../types';
import { UnauthorizedError } from 'express-jwt';

const addActiviteit = async (activiteit: Activiteit, groepNaam: string, rol: Rol, totem: string): Promise<Activiteit> => {
    if (rol !== 'HOOFDLEIDING' && rol !== 'LEIDING') {
        throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        const leiding = await groepService.getLeidingForGroep(groepNaam);
        if (!leiding) {
            throw new Error('Groep not found');
        }
        else if (leiding.find(l => l.getTotem() === totem) === undefined) {
            throw new UnauthorizedError('credentials_required', new Error('wrong totem'));
        }
        const activiteitDB = await activiteitRepo.createActiviteit(activiteit);
        await groepService.addActiviteitToGroep(groepNaam, activiteitDB);
        return activiteitDB;
    } catch (error) {
        throw error;
    }
}

const deleteActiviteit = async (groepNaam: string, activiteitId: number, rol: Rol, totem: string): Promise<String> => {
    if (rol !== 'HOOFDLEIDING' && rol !== 'LEIDING') {
        throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        const leiding = await groepService.getLeidingForGroep(groepNaam);
        if (!leiding) {
            throw new Error('Groep not found');
        }
        else if (leiding.find(l => l.getTotem() === totem) === undefined) {
            throw new UnauthorizedError('credentials_required', new Error('wrong totem'));
        }
        if (!activiteitId) {
            throw new Error('Activiteit not found');
        }
        const groepActiviteiten = await groepService.getActiviteitenForGroep(groepNaam);
        if (!groepActiviteiten) {
            throw new Error('Groep not found');
        }
        const dbActiviteit = await activiteitRepo.getActiviteitById({id: activiteitId});
        const res = await activiteitRepo.verwijderActiviteit(dbActiviteit);
        return res;
    } catch (error) {
        throw error;
    }
}

const updateActiviteit = async (activiteit: Activiteit, groepNaam: string, rol: Rol, totem: string): Promise<Activiteit> => {
    if (rol !== 'HOOFDLEIDING' && rol !== 'LEIDING') {
        throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        const leiding = await groepService.getLeidingForGroep(groepNaam);
        if (!leiding) {
            throw new Error('Groep not found');
        }
        else if (leiding.find(l => l.getTotem() === totem) === undefined) {
            throw new UnauthorizedError('credentials_required', new Error('wrong totem'));
        }
        const groepActiviteiten = await groepService.getActiviteitenForGroep(groepNaam);
        if (!groepActiviteiten) {
            throw new Error('Groep not found');
        }
        let activiteitFound = false;

        for (const act of groepActiviteiten) {
            if (act.getId() === activiteit.getId()) {
                activiteitFound = true;
                break;
            }
        }

        if (!activiteitFound) {
            throw new Error('Activiteit not found in groep');
        }
        const res = await activiteitRepo.veranderActiviteit(activiteit);
        return res;
    } catch (error) {
        throw error;
    }
}

export default {
    addActiviteit,
    deleteActiviteit,
    updateActiviteit
};