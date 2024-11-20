// src/service/orderService.ts
import { Order } from '../model/order';
import orderRepository from '../repository/order.db';
import { User } from '../model/user';
import { Promotion } from '../model/promotion';

const createOrder = async (orderData: {
    orderDate: Date;
    product: string;
    price: number;
    user: User;
    promotions: Promotion[];
}): Promise<Order> => {
    // Create a new Order instance using the provided data
    const order = new Order(orderData);

    // Save the order using the repository and return the saved order
    return await orderRepository.saveOrder({
        orderDate: order.getOrderDate(),
        product: order.getProduct(),
        price: order.getPrice(),
        user: order.getUser(),
        promotions: order.getPromotions()
    });
};


//Method to get all orders
const getAllOrders = (): Order[] => {
    return orderRepository.getAllOrders();
};

export default {
    getAllOrders,
    createOrder,
    // other order-related methods...
};
