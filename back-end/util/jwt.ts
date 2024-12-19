    import jwt from 'jsonwebtoken';

    const generateJwtToken = ({ email }: {email: string}): string => {
        const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'pft_app' };

        try {
            return jwt.sign({ email }, process.env.JWT_SECRET as string, options);   
        } catch (error) {
            throw new Error('Error generating JWT token, see server log for details.')
        }
    }

    export {generateJwtToken};