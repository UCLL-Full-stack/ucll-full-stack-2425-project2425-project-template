import { Category } from '../model/category';
import categoryDb from '../repository/category.db';
import { CategoryInput } from '../types';

const addCategory = async ({ name, description }: CategoryInput): Promise<Category> => {
    try {
        const category = await categoryDb.getCategory(name, description);
        if (category) {
            return category;
        }
        return await categoryDb.addCategory(
            new Category({
                name,
                description,
            })
        );
    } catch (error) {
        throw new Error(`Error:${error}`);
    }
};

export default {
    addCategory,
};
