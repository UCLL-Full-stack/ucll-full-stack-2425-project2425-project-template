import jwt from 'jsonwebtoken';
import { Rol } from '../types';

const generateSWTtoken = (totem: string, role: Rol): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
    }
    return jwt.sign({ totem: totem, rol: role }, secret, { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h` });
};

export default generateSWTtoken ;