import { Order } from "../model/order";
import { OrderInput, UserInput } from "../types";
import orderDB from "../repository/order.db";
import userDB from "../repository/user.db";

const getAllOrders = async (): Promise<Order[]> => {
    return await orderDB.getAllOrders();
}

const getOrderById = async (id: number): Promise<Order> => {
    const order = await orderDB.getOrderById({ id });
    if (!order) throw new Error(`Order with id ${id} does not exist`);
    return order;
};

const createOrder = async ( orderInput: OrderInput ): Promise<Order> => {
    const user = await userDB.getUserById({ id: orderInput.userId });
    if (!user) throw new Error('User not found');

    const order = new Order({
        builds: [],
        price: orderInput.price,
        orderStatus: orderInput.orderStatus,
        orderDate: orderInput.orderDate,
        user,
    });

    return await orderDB.createOrder(order);
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
};