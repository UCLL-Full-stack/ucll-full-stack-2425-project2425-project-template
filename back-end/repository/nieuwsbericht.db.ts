import { Nieuwsbericht } from "../model/nieuwsbericht";
import database from "../util/database";

const createNieuwsbericht = async (nieuwsbericht: Nieuwsbericht): Promise<Nieuwsbericht> => {
    try {
        const nieuwsberichtPrisma = await database.nieuwsbericht.create({
            data: {
                titel: nieuwsbericht.getTitel(),
                inhoud: nieuwsbericht.getInhoud(),
                datum: nieuwsbericht.getDatum(),
                leidingId: nieuwsbericht.getAuteur()
            }
        });

        return Nieuwsbericht.from({
            ...nieuwsberichtPrisma,
            auteurId: nieuwsberichtPrisma.leidingId
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating a nieuwsbericht');
    }
}

const getAllNieuwsberichten = async (): Promise<Nieuwsbericht[]> => {
    try {
        const nieuwsberichtenPrisma = await database.nieuwsbericht.findMany();
        return nieuwsberichtenPrisma.map((nieuwsberichtPrisma) => Nieuwsbericht.from({ ...nieuwsberichtPrisma, auteurId: nieuwsberichtPrisma.leidingId }));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while getting all nieuwsberichten');
    }
}

const getNieuwsberichtById = async ({ id }: { id: number }): Promise<Nieuwsbericht> => {
    try {
        const nieuwsberichtPrisma = await database.nieuwsbericht.findUnique({
            where: {
                id: id
            }
        });
        if (!nieuwsberichtPrisma) {
            throw new Error("Nieuwsbericht not found");
        }
        return Nieuwsbericht.from({ ...nieuwsberichtPrisma, auteurId: nieuwsberichtPrisma.leidingId });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while getting a nieuwsbericht by id');
    }
}

const updateNieuwsbericht = async (nieuwsbericht: Nieuwsbericht): Promise<Nieuwsbericht> => {
    try {
        const nieuwsberichtPrisma = await database.nieuwsbericht.update({
            where: {
                id: nieuwsbericht.getId()
            },
            data: {
                titel: nieuwsbericht.getTitel(),
                inhoud: nieuwsbericht.getInhoud(),
                datum: nieuwsbericht.getDatum(),
                leidingId: nieuwsbericht.getAuteur()
            }
        });
        return Nieuwsbericht.from({ ...nieuwsberichtPrisma, auteurId: nieuwsberichtPrisma.leidingId });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating a nieuwsbericht');
    }
}

const deleteNieuwsbericht = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.nieuwsbericht.delete({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting a nieuwsbericht');
    }
}

export default {
    createNieuwsbericht,
    getAllNieuwsberichten,
    getNieuwsberichtById,
    updateNieuwsbericht,
    deleteNieuwsbericht
};