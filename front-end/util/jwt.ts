import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,       
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};
