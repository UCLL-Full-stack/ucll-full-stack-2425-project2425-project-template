import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';
const expiresIn = process.env.JWT_EXPIRES_HOURS || '8h';

export function generateJWTtoken(username: string,         ): string {
    const payload = { username };
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
}