import jwt from 'jsonwebtoken';
type JwtPayload = {
    username: string;
    role: string;  // or Role if you have a defined type for role
};
const generateJwtToken = ({ username, role }:JwtPayload): string => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: "fullstack_app" };

    try {
        return jwt.sign({ username, role }, jwtSecret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details');
    }
};

export { generateJwtToken };
