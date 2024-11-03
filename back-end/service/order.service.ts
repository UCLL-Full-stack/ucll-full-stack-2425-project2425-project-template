import orderDB from "../repository/order.db";
import { Order } from "../model/order";

const getAllOrders = (): Order[] => orderDB.getAllOrders();

const getOrderById = (id: number): Order => {
    const order = orderDB.getOrderById({ id });
    if (!order) throw new Error(`Order with id ${id} does not exist`);
    return order;
};

export default { getAllOrders, getOrderById };