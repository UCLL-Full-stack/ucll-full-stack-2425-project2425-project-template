import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';
import db from './db';

const getAll = async (): Promise<Shoppingcart[]> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.findMany({
            include: {
                items: true,
                user: true,
            },
        });

        return shoppingcartPrisma.map((shoppingcartPrisma) =>
            Shoppingcart.from(shoppingcartPrisma)
        );
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all shoppingcarts');
    }
};

const getById = async (id: number): Promise<Shoppingcart | undefined> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                items: true,
            },
        });

        return shoppingcartPrisma ? Shoppingcart.from(shoppingcartPrisma) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get item by id');
    }
};

const create = async (shoppingcart: Shoppingcart): Promise<Shoppingcart> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.create({
            data: {
                name: shoppingcart.getName(),
                deliveryDate: new Date(shoppingcart.getDeliveryDate()),
                user: {
                    connect: {
                        id: shoppingcart.getUser()?.getId(),
                    },
                },
            },

            include: {
                items: true,
                user: true,
            },
        });

        return Shoppingcart.from(shoppingcartPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create shoppingcart');
    }
};

const addItemToShoppingcart = async ({
    item,
    shoppingcart,
}: {
    item: Item;
    shoppingcart: Shoppingcart;
}) => {
    try {
        const existingitems = shoppingcart.getItems();
        const shoppingcartPrisma = await db.shoppingcart.update({
            where: {
                id: shoppingcart.getId(),
            },

            data: {
                items: {
                    connect: [
                        ...existingitems.map((existingItem) => ({ id: existingItem.getId() })),
                        { id: item.getId() },
                    ],
                },
            },

            include: {
                items: true,
                user: true,
            },
        });

        return shoppingcartPrisma ? Shoppingcart.from(shoppingcartPrisma) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error('Could not add item to shoppingcart');
    }
};

export default {
    getAll,
    getById,
    addItemToShoppingcart,
    create,
};
