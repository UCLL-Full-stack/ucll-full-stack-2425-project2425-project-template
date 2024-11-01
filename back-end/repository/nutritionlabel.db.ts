import { Nutritionlabel } from '../model/nutritionlabel';

const nutritionlabels = [
    new Nutritionlabel({
        id: 0,
        energy: 100,
        fat: 10,
        saturatedFats: 5,
        carbohydrates: 20,
        sugar: 10,
        protein: 5,
        salts: 0.5,
    }),

    new Nutritionlabel({
        id: 1,
        energy: 200,
        fat: 20,
        saturatedFats: 10,
        carbohydrates: 40,
        sugar: 20,
        protein: 10,
        salts: 1,
    }),
];

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
