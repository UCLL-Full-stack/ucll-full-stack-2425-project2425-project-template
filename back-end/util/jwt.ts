import jwt from 'jsonwebtoken';
const generateJwtToken = ({ email, role }: any): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses-app' };
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error while generating JWT token, see server log for details');
    }
};
export { generateJwtToken };
