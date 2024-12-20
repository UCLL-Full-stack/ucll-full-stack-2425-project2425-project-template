import { Order } from "../model/order";
import orderDb from "../repository/order.db";
import cartDb from "../repository/cart.db";
import userDb from "../repository/user.db";

const createOrder = async (email: string): Promise<Order> => {
    const user = await userDb.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.getId();
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }

    const cart = await cartDb.getCartByUserId(userId);
    if (!cart || cart.getProducts().length === 0) {
        throw new Error('Cart is empty or not found');
    }

    const totalPrice = cart.getTotalPrice();
    const orderDate = new Date();

    const order = new Order({
        totalPrice,
        orderDate,
        products: cart.getProducts(),
        user,
    });

    const createdOrder = await orderDb.createOrder(order);

    // Clear the cart's products
    await cartDb.clearCartProducts(cart.getId()!);

    return createdOrder;
};

const getOrdersByUserEmail = async (email: string): Promise<Order[]> => {
    const user = await userDb.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.getId()!;
    return await orderDb.getOrdersByUserId(userId);
};

export default {
    createOrder,
    getOrdersByUserEmail,
};
