import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ username, role }: { username: string; role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'EuroStudentTravel'}

    try {
        return jwt.sign({ username, role }, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server log for more details.");
    }
}

export { generateJwtToken };