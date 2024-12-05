import jwt from 'jsonwebtoken';
import { Role } from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined');
}

const EXPIRES = process.env.JWT_EXPIRES_HOURS;
if (!EXPIRES) {
    throw new Error('JWT_EXPIRES_HOURS is not defined');
}

interface TokenPayload {
    name: string;
    role: Role;
}

export const generateSWTtoken = (name: string, role: Role): string => {
    const payload: TokenPayload = { name, role };
    const expiresIn = `${EXPIRES}h`;
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}