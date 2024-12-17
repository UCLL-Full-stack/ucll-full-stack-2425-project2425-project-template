import jwt from 'jsonwebtoken';
const generateJwtToken = ({ username, role }: { username: string; role: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app'}
    try {
    return jwt.sign({ username, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT token, see server log for details');
    }
}
export {generateJwtToken};