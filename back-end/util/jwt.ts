import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userDb from '../repository/user.db';
import { Role } from '../types';

const generateJWTtoken = ({ email, role }: { email: string, role: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'Farshad' };

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token.");
    }
};

const verifyJWTtoken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyJWTtoken(token) as { email: string };
        const user = await userDb.getUserByEmail(decoded.email);

        if (!user || user.getRole() !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Access denied' });
    }
};

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyJWTtoken(token) as { email: string; role: Role };
        const user = await userDb.getUserByEmail(decoded.email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach user info to the request object
        (req as any).auth = { email: user.getEmail(), role: user.getRole() };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export { generateJWTtoken, isAdmin, isAuthenticated };