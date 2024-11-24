import { PrismaClient } from '@prisma/client';
import { Shoppingcart } from "../model/shoppingcart";  // Optional if you're using Prisma models directly

const prisma = new PrismaClient();

const getShoppingCartById = async ({ id }: { id: number }): Promise<Shoppingcart | null> => {
    try {
        const shoppingCart = await prisma.shoppingCart.findUnique({
            where: {
                id: id,  
            },
            include: {
                products: true,  
            },
        });

        if (!shoppingCart) {
            return null;  
        }

        return shoppingCart;  
    } catch (error) {
        throw new Error('Shoppingcart not found');
    }
};

export default { getShoppingCartById };
