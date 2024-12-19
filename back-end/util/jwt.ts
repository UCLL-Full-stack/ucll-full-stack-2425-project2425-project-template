import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types';



const generateJWTtoken = ({ email, role }: TokenPayload): string => {

    

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'workoutplanner_app' };
    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET || 'default_secret', options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJWTtoken };
