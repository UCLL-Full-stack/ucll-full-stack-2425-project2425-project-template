import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ username, role, studentId }: { username: string; role: Role, studentId:number | undefined }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'EuroStudentTravel'}

    try {
        return jwt.sign({ username, role, studentId}, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server log for more details.");
    }
}

export { generateJwtToken };