import { Category } from '../model/category';
import database from './database';

const addCategory = async (category: Category): Promise<Category> => {
    try {
        const result = await database.category.create({
            data: {
                name: category.getName(),
                description: category.getDescription(),
            },
        });
        return Category.from(result);
    } catch (error) {
        console.log(error);
        throw new Error(`Error: ${error}`);
    }
};

const getCategoryById = async (id: number): Promise<Category> => {
    try {
        const result = await database.category.findUnique({ where: { id: id } });
        if (!result) {
            throw new Error(`Category with id ${id} found`);
        }
        return Category.from(result);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server logs for more detail');
    }
};

const getCategory = async (name: string, description: string): Promise<Category | null> => {
    const result = await database.category.findFirst({
        where: {
            name,
            description,
        },
    });
    if (!result) {
        return null;
    }
    return Category.from(result);
};

const getCategories = async (): Promise<Category[]> => {
    try {
        const categoriesPrisma = await database.category.findMany();
        return categoriesPrisma.map((categoryPrisma) => Category.from(categoryPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database Error, see server log for more detail');
    }
};

export default {
    addCategory,
    getCategory,
    getCategoryById,
    getCategories,
};
