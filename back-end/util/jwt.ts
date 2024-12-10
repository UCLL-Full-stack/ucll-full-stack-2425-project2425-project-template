import jwt from 'jsonwebtoken';
import { Role } from '../types';

export default function generateSWToken({ email, role }: { email: string; role: Role }) {
    const secretKey = process.env.JWT_SECRET;
    const expirationTime = process.env.JWT_EXPIRES_HOURS;

    if (!secretKey) {
        throw new Error('SECRET_KEY environment variable is not defined');
    }
    return jwt.sign({ email, role }, secretKey, { expiresIn: expirationTime });
}
