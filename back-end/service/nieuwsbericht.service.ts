import { UnauthorizedError } from 'express-jwt';
import { Nieuwsbericht, PublicNieuwsbericht } from '../model/nieuwsbericht';
import nieuwsRepo from '../repository/nieuwsbericht.db';
import leidingRepo from '../repository/leiding.db';
import { Rol } from '../types';

const getAllNieuwsberichten = async (): Promise<PublicNieuwsbericht[]> => {
    try{
        const berichten =  await nieuwsRepo.getAllNieuwsberichten();
        return berichten;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createNieuwsbericht = async (nieuwsbericht: Nieuwsbericht, totem: string, rol: Rol): Promise<Nieuwsbericht> => {
    if (rol !== 'HOOFDLEIDING') {
            throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        const leiding = await leidingRepo.getLeidingByTotem({totem});
        if (!leiding) {
            throw new Error('Leiding not found');
        }
        return await nieuwsRepo.createNieuwsbericht(nieuwsbericht, leiding.getId());
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateNieuwsbericht = async (nieuwsbericht: Nieuwsbericht, totem: string, rol: Rol): Promise<PublicNieuwsbericht> => {
    if (rol !== 'HOOFDLEIDING') {
        throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        const leiding = await leidingRepo.getLeidingByTotem({totem});
        if (!leiding) {
            throw new Error('Leiding not found');
        }
        return await nieuwsRepo.updateNieuwsbericht(nieuwsbericht);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteNieuwsbericht = async (id: number, totem: string, rol: Rol): Promise<void> => {
    if (rol !== 'HOOFDLEIDING') {
        throw new UnauthorizedError('credentials_required', new Error('wrong role'));
    }
    try {
        await nieuwsRepo.deleteNieuwsbericht({id});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {
    getAllNieuwsberichten,
    createNieuwsbericht,
    updateNieuwsbericht,
    deleteNieuwsbericht
}