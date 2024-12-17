import database from "../util/database"; // Prisma instance for querying
import { Nurse } from "../model/nurse"; // Assuming Nurse model is defined
import { Role } from "../types"; // Assuming Role is a type or enum (if necessary)

const getNurseByEmail = async (email: string): Promise<Nurse | null> => {
    // First, find the user by email
    const user = await database.user.findFirst({
        where: { email },
    });

    if (!user) {
        throw new Error(`User with email ${email} not found.`);
    }

    // Then, find the trainer using the userId
    const nursePrisma = await database.nurse.findFirst({ // Use findFirst here
        where: {
            userId: user.id, // Use userId to find the trainer
        },
        include: {
            user: true,
            pokemon: {
                include: {
                    stats: true,
                },
            },
        },
    });

    if (!nursePrisma) {
        throw new Error(`Trainer with userId ${user.id} not found.`);
    }

    // Return the transformed trainer object
    return Nurse.from({
        ...nursePrisma,
        
    });
};



export default { getNurseByEmail };
