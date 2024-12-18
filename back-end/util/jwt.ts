import jwt from 'jsonwebtoken'
import { JWTload } from '../types/types';



const generateJwtToken = ({ email, role }: JWTload): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'shitty_app'}

    try {
        return jwt.sign({ email, role }, `${process.env.JWT_SECRET}`  , options);
    } catch (err) {
        console.log(err);
        throw new Error('Error generating JWT token.');
    }
 }


 export { generateJwtToken }