import { Nutritionlabel } from '../model/nutritionlabel';
import nutritionlabelDb from '../repository/nutritionlabel.db';
import { NutritionlabelInput } from '../types';

const getAllNutritionlabels = (): Nutritionlabel[] => {
    const nutritionLabels = nutritionlabelDb.getAll();
    if (!nutritionLabels) {
        throw new Error('No nutrition labels found');
    }

    return nutritionLabels;
};

const createNutritionlabel = (nutritionlabel: NutritionlabelInput): Nutritionlabel => {
    const newNutritionlabel = new Nutritionlabel(nutritionlabel);
    const createdNutritionLabel = nutritionlabelDb.create(newNutritionlabel);
    if (!createdNutritionLabel) {
        throw new Error('Could not create nutritionlabel');
    }

    return createdNutritionLabel;
};

export default { getAllNutritionlabels, createNutritionlabel };
