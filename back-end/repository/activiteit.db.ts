import { Activiteit } from "../model/activiteit";
import database from "../util/database";

const createActiviteit = async (activiteit: Activiteit): Promise<Activiteit> => {
    try{
        const activiteitPrisma = await database.activiteit.create({
            data: {
                naam: activiteit.getNaam(),
                beschrijving: activiteit.getBeschrijving(),
                beginDatum: activiteit.getBegindatum(),
                eindDatum: activiteit.getEinddatum()
            }
        });

        return Activiteit.from({
            ...activiteitPrisma,
            begindatum: activiteitPrisma.beginDatum,
            einddatum: activiteitPrisma.eindDatum
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating an activiteit');
    }
}

const getActiviteitById = async ({id}: {id: number}): Promise<Activiteit> => {
    try{
        const activiteitPrisma = await database.activiteit.findUnique({
            where: {
                id: id
            }
        });

        if (!activiteitPrisma || !activiteitPrisma.naam || !activiteitPrisma.beschrijving) {
            throw new Error('Invalid activiteit data');
        }

        return Activiteit.from({
            id: activiteitPrisma.id,
            naam: activiteitPrisma.naam,
            beschrijving: activiteitPrisma.beschrijving,
            begindatum: activiteitPrisma.beginDatum,
            einddatum: activiteitPrisma.eindDatum
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching an activiteit');
    }
}
const veranderActiviteit = async (activiteit: Activiteit): Promise<Activiteit> => {
    try{
        const activiteitPrisma = await database.activiteit.update({
            where: {
                id: activiteit.getId()
            },
            data: {
                naam: activiteit.getNaam(),
                beschrijving: activiteit.getBeschrijving(),
                beginDatum: activiteit.getBegindatum(),
                eindDatum: activiteit.getEinddatum()
            }
        });

        return Activiteit.from({
            ...activiteitPrisma,
            begindatum: activiteitPrisma.beginDatum,
            einddatum: activiteitPrisma.eindDatum
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating an activiteit');
    }
}

const verwijderActiviteit = async (activiteit: Activiteit): Promise<String> => {
    try{
        const activiteitPrisma = await database.activiteit.delete({
            where: {
                id: activiteit.getId()
            }
        });

        return "Activiteit succesvol verwijderd";
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting an activiteit');
        return "Activiteit niet verwijderd";
    }
}

export default {createActiviteit, getActiviteitById, veranderActiviteit, verwijderActiviteit};