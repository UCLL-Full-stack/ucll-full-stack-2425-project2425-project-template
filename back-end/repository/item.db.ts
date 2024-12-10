import { Item } from '../model/item';
import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Item[]> => {
    try {
        const itemsPrisma = await db.item.findMany({ include: { nutritionlabel: true } });

        return itemsPrisma.map((itemPrisma) =>
            Item.from({ ...itemPrisma, nutritionlabel: itemPrisma.nutritionlabel ?? undefined })
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const create = async (item: Item): Promise<Item> => {
    try {
        const itemPrisma = await db.item.create({
            data: {
                name: item.getName(),
                price: item.getPrice(),
                pathToImage: item.getPathToImage(),
                category: item.getCategory(),
            },
        });

        return Item.from(itemPrisma);
    } catch (error) {
        console.error('Error creating item:', error);
        throw new Error('Could not create item');
    }
};

const getById = async (id: number): Promise<Item | undefined> => {
    try {
        const itemPrisma = await db.item.findUnique({ where: { id } });

        return itemPrisma ? Item.from(itemPrisma) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get item by id');
    }
};

const addNutritionlabel = async (item: Item, nutritionlabel: Nutritionlabel): Promise<Item> => {
    try {
        const itemPrisma = await db.item.findUnique({ where: { id: item.getId() } });

        if (!itemPrisma) {
            throw new Error(`Item with id ${item.getId()} not found`);
        }

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

        const updatedItem = await db.item.update({
            where: { id: item.getId() },
            data: {
                nutritionlabel: {
                    connect: { id: nutritionlabelPrisma.id },
                },
            },

            include: {
                nutritionlabel: true,
            },
        });

        return Item.from({
            ...updatedItem,
            nutritionlabel: updatedItem.nutritionlabel ?? undefined,
        });
    } catch (error) {
        console.log(error);
        throw new Error('Could not add nutritionlabel to item');
    }
};

const deleteItem = async (id: number): Promise<string> => {
    try {
        const itemPrisma = await db.item.findUnique({ where: { id } });

        if (!itemPrisma) {
            throw new Error(`Item with id ${id} not found`);
        }

        await db.item.delete({ where: { id } });

        return `Item ${itemPrisma.name} deleted`;
    } catch (error) {
        console.log(error);
        throw new Error('Could not delete item');
    }
};

export default {
    getAll,
    create,
    getById,
    addNutritionlabel,
    deleteItem,
};
