import jwt from 'jsonwebtoken';
import { Role } from '../types';


const generateJwtToken = (user: { email: string, role: string }) => {
  const secretKey = process.env.JWT_SECRET || 'your-secret-key';
  const token = jwt.sign(
    { email: user.email, role: user.role },
    secretKey,
    { expiresIn: '1h' }  // Token expires in 1 hour
  );
  return token;
};


export { generateJwtToken };
