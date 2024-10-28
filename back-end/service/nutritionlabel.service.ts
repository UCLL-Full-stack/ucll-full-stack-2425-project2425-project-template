import { Nutritionlabel } from '../model/nutritionlabel';
import nutritionlabelDb from '../repository/nutritionlabel.db';

const getAllNutritionlabels = (): Nutritionlabel[] => {
    const nutritionLabels = nutritionlabelDb.getAll();
    if (!nutritionLabels) {
        throw new Error('No nutrition labels found');
    }

    return nutritionLabels;
};

export default { getAllNutritionlabels };
