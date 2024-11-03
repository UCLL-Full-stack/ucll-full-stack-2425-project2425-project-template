import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '@/components/cart';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Cart {
    id: number;
    products: Product[];
    totalPrice: number;
}

const CartPage = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get<Cart[]>('http://localhost:3000/carts');
                console.log('Fetched cart items:', response.data);
                const cart = response.data[0]; 
                const products = cart.products || []; 
                setItems(products);
                const total = response.data[0]; 
                setTotalPrice(total.totalPrice); 
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