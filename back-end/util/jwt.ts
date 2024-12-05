import jwt from 'jsonwebtoken';

const generateJWTtoken = (username: string) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = `${process.env.JWT_EXPIRES_HOURS}h`;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
    };

    return jwt.sign({ username }, secret, { expiresIn: expiresIn });
}

export { generateJWTtoken };