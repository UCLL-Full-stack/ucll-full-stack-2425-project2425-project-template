import jwt from 'jsonwebtoken';

const generateJwtToken =  ({ username }: { username: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'EuroStudentTravel'}

    try {
        return jwt.sign({ username }, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server log for more details.");
    }
}

export { generateJwtToken };