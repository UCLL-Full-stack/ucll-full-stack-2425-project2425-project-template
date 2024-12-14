import { Part } from "../model/part";
import { Build } from "../model/build";
import { Order } from "../model/order";
import database from './database';
import { User } from "../model/user";

// const parts = [
//     new Part({ id: 1, name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150}),
//     new Part({ id: 2, name: 'Ryzen 7600X', brand: 'AMD', type: 'CPU', price: 220}),
//     new Part({ id: 3, name: 'Ryzen 7800X', brand: 'AMD', type: 'CPU', price: 320}),
//     new Part({ id: 4, name: 'Ryzen 9800X', brand: 'AMD', type: 'CPU', price: 400}),
//     new Part({ id: 5, name: 'Geforce RTX4060', brand: 'Nvidia', type: 'GPU', price: 300}),
//     new Part({ id: 6, name: 'Geforce RTX4090', brand: 'Nvidia', type: 'CPU', price: 1000}),
// ]

// const builds = [
//     new Build({
//         id: 1,
//         parts: [parts[0], parts[4]],
//         price: 700,
//         preBuild: true,
//     }),
//     new Build({
//         id: 1,
//         parts: [parts[3], parts[5]],
//         price: 2050,
//         preBuild: false,
//     }),
// ]

// const orders = [
//     new Order({
//         id: 1,
//         builds: [builds[0]],
//         price: 700,
//         orderStatus: 'shipping',
//         orderDate: new Date(),
//     }),
//     new Order({
//         id: 2,
//         builds: [builds[1]],
//         price: 2050,
//         orderStatus: 'preparing',
//         orderDate: new Date(),
//     })
// ]

const getAllOrders = async (): Promise<Order[]> => {
    try {
        const orderPrisma = await database.order.findMany({
            include: { builds: true, user: true },
        });
        return orderPrisma.flatMap((orderPrisma) => Order.from(orderPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrderById = async ({ id }: { id: number }): Promise<Order | null> => {
    try {
        const orderPrisma = await database.order.findUnique({
            where: { id },
            include: { builds: true, user: true },
        });
        return orderPrisma ? Order.from(orderPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createOrder = async (order: Order): Promise<Order> => {
    try {
        const orderPrisma = await database.order.create({
            data: {
                builds: {
                    connect: order.getBuilds().map((build) => ({ id: build.getId() })),
                },
                price: order.getPrice(),
                orderStatus: order.getOrderStatus(),
                orderDate: order.getOrderDate(),
                user: {
                    connect: { id: order.getUser().getId() },
                },
            },
            include: { user: true, builds: true },
        });

        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const createOrder = async (order: Order, user: User): Promise<Order> => {
//     try {
//         const orderPrisma = await database.order.create({
//             data: {
//                 builds: {
//                     connect: order.getBuilds().map((build) => ({ id: build.getId() })),
//                 },
//                 price: order.getPrice(),
//                 orderStatus: order.getOrderStatus(),
//                 orderDate: order.getOrderDate(),
//                 user: {
//                     connect: { id: user.getId() },
//                 },
//             },
//             include: { user: true, builds: true },
//         });

//         return Order.from(orderPrisma);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

export default {
    getAllOrders,
    getOrderById,
    createOrder,
};