import { Nutritionlabel } from '../model/nutritionlabel';

const nutritionlabels: Nutritionlabel[] = [];

const getAll = (): Nutritionlabel[] => {
    try {
        return nutritionlabels;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all nutritionlabels');
    }
};
const create = (nutritionlabel: Nutritionlabel): Nutritionlabel => {
    try {
        nutritionlabel.setId(nutritionlabels.length);
        nutritionlabels.push(nutritionlabel);
        return nutritionlabel;
    } catch (error) {
        console.log(error);
        throw new Error('Could not create nutritionlabel');
    }
};

export default {
    getAll,
    create,
};
