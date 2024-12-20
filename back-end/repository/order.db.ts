import { Order } from "../model/order";
import database from "./database";

const createOrder = async (order: Order): Promise<Order> => {
    try {
        const productIds = order.products.map(product => product.getId());
        if (productIds.some(id => id === undefined)) {
            throw new Error('One or more product IDs are undefined');
        }

        const orderPrisma = await database.order.create({
            data: {
                totalPrice: order.getTotalPrice(),
                orderDate: order.getOrderDate(),
                userId: order.getUser().getId()!,
                products: {
                    create: productIds.map(productId => ({
                        product: { connect: { id: productId } }
                    })),
                },
            },
            include: {
                user: true,
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    try {
        const ordersPrisma = await database.order.findMany({
            where: { userId },
            include: {
                user: true,
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return ordersPrisma.map(orderPrisma => Order.from(orderPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createOrder,
    getOrdersByUserId,
};
