import jwt from 'jsonwebtoken';
import { Role } from '../types';

const SECRET_KEY = process.env.JWT_SECRET
const EXPIRES = process.env.JWT_EXPIRES_HOURS

interface TokenPayload {
    name: string;
    role: Role;
}

export const generateSWTtoken = (name: string, role: Role): string => {
    const payload: TokenPayload = { name, role };
    const expiresIn = ${ EXPIRES }h;
    return jwt.sign(payload, SECRET_KEY, { expiresIn: `${expiresIn}h` });
}