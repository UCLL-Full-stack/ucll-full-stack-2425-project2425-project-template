import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Nutritionlabel[]> => {
    try {
        const nutritionlabelPrisma = await db.nutritionlabel.findMany();
        return nutritionlabelPrisma.map((nutritionlabelPrisma) =>
            Nutritionlabel.from(nutritionlabelPrisma)
        );
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all nutritionlabels');
    }
};

const create = async (nutritionlabel: Nutritionlabel): Promise<Nutritionlabel> => {
    try {
        const nutritionlabelPrisma = await db.nutritionlabel.create({
            data: {
                energy: nutritionlabel.getEnergy(),
                fat: nutritionlabel.getFat(),
                saturatedFats: nutritionlabel.getSaturatedFats(),
                carbohydrates: nutritionlabel.getCarbohydrates(),
                sugar: nutritionlabel.getSugar(),
                protein: nutritionlabel.getProtein(),
                salts: nutritionlabel.getSalts(),
            },
        });

        return Nutritionlabel.from(nutritionlabelPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create nutritionlabel');
    }
};

export default {
    getAll,
    create,
};
