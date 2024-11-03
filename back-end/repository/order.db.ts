import { Part } from "../model/part";
import { Build } from "../model/build";
import { Order } from "../model/order";

const parts = [
    new Part({ id: 1, name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150}),
    new Part({ id: 2, name: 'Ryzen 7600X', brand: 'AMD', type: 'CPU', price: 220}),
    new Part({ id: 3, name: 'Ryzen 7800X', brand: 'AMD', type: 'CPU', price: 320}),
    new Part({ id: 4, name: 'Ryzen 9800X', brand: 'AMD', type: 'CPU', price: 400}),
    new Part({ id: 5, name: 'Geforce RTX4060', brand: 'Nvidia', type: 'GPU', price: 300}),
    new Part({ id: 6, name: 'Geforce RTX4090', brand: 'Nvidia', type: 'CPU', price: 1000}),
]

const builds = [
    new Build({
        id: 1,
        parts: [parts[0], parts[4]],
        price: 700,
        preBuild: true,
    }),
    new Build({
        id: 1,
        parts: [parts[3], parts[5]],
        price: 2050,
        preBuild: false,
    }),
]

const orders = [
    new Order({
        id: 1,
        builds: [builds[0]],
        price: 700,
        orderStatus: 'shipping',
        orderDate: new Date(),
    }),
    new Order({
        id: 2,
        builds: [builds[1]],
        price: 2050,
        orderStatus: 'preparing',
        orderDate: new Date(),
    })
]

const getAllOrders = (): Order[] => orders;

const getOrderById = ({ id }: { id: number }): Order | null => {
    return orders.find((order) => order.getId() === id) || null;
};

export default { getAllOrders, getOrderById };