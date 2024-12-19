import React, { useEffect, useState } from 'react';
import CartService from '@/services/CartService';
import Cart from '@/components/cart';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
}

const CartPage = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = await CartService.getCart();
                console.log('Fetched cart items:', cart);
                const products = cart.products || [];
                setItems(products);
                setTotalPrice(cart.totalPrice);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h1>Your Cart</h1>
            <Cart items={items} totalPrice={totalPrice} />
        </div>
    );
};

export default CartPage;