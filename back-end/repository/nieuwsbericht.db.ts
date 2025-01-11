import { Nieuwsbericht, PublicNieuwsbericht } from "../model/nieuwsbericht";
import database from "../util/database";

const createNieuwsbericht = async (nieuwsbericht: Nieuwsbericht, id: number): Promise<Nieuwsbericht> => {
    try {
        const nieuwsberichtPrisma = await database.nieuwsbericht.create({
            data: {
                titel: nieuwsbericht.getTitel(),
                inhoud: nieuwsbericht.getInhoud(),
                datum: nieuwsbericht.getDatum(),
                leiding:{
                    connect: {
                        id: id
                    }
                }
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

const getAllNieuwsberichten = async (): Promise<PublicNieuwsbericht[]> => {
    try {
        const nieuwsberichtenPrisma = await database.nieuwsbericht.findMany({
            include: {
                leiding: {
                    select: {
                        totem: true
                    }
                }
            }
        });
        const nieuwsberichten =  nieuwsberichtenPrisma.map((nieuwsberichtPrisma) => PublicNieuwsbericht.from({nieuwsbericht: Nieuwsbericht.from({ ...nieuwsberichtPrisma, auteurId: nieuwsberichtPrisma.leidingId }), auteur: nieuwsberichtPrisma.leiding.totem}));
        return nieuwsberichten;
    } catch (error) {
        console.error(error);
        throw error;
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

const updateNieuwsbericht = async (nieuwsbericht: Nieuwsbericht): Promise<PublicNieuwsbericht> => {
    try {
        const nieuwsberichtPrisma = await database.nieuwsbericht.update({
            where: {
                id: nieuwsbericht.getId()
            },
            data: {
                titel: nieuwsbericht.getTitel(),
                inhoud: nieuwsbericht.getInhoud(),
                datum: nieuwsbericht.getDatum(),
            },
            include: {
                leiding: {
                    select: {
                        totem: true
                    }
                }
            }
        });
        return PublicNieuwsbericht.from({
            nieuwsbericht: Nieuwsbericht.from({ ...nieuwsberichtPrisma, auteurId: nieuwsberichtPrisma.leidingId }),
             auteur: nieuwsberichtPrisma.leiding.totem});
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