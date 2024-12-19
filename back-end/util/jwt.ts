import jwt from 'jsonwebtoken';
import { Permission } from '../types';

const generateJwtToken = ({ id, username, permission }: { id: number, username: string; permission: Permission }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'professional_racists' };

    try {
        return jwt.sign({ id, username, permission }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error while generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };