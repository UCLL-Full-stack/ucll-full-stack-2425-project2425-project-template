import leidingRepo from '../repository/leiding.db';
import { Leiding } from '../model/leiding';
import bcrypt from 'bcrypt';
import generateSWTtoken from '../util/jwt';
import { AuthenticationResponse } from '../types';


const login = async (totem: string, password: string): Promise<AuthenticationResponse> => {
    try {
        const leiding = await leidingRepo.getLeidingByTotem({totem});
        if (!leiding) {
            throw new Error('Leiding not found');
        }
        const valid = await bcrypt.compare(password, leiding.getWachtwoord());
        if (!valid) {
            throw new Error('Incorrect password');
        }
        return {
            token: generateSWTtoken(leiding.getTotem(), leiding.getRol()),
            totem: leiding.getTotem(),
            rol: leiding.getRol()
        }
    } catch (error) {
        throw error;
    }
}

export default {
    login
};