import React, { useEffect, useState } from 'react';
import CartService from '@/services/CartService';
import OrderService from '@/services/OrderService';
import Cart from '@/components/cart';
import { useRouter } from 'next/router';

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
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                if (!token) {
                    alert('You must be logged in to view your cart.');
                    router.push('/login'); // Redirect to login page
                    return;
                }
                const cart = await CartService.getCart(token);
                console.log('Fetched cart items:', cart);
                const products = cart.products || [];
                setItems(products);
                setTotalPrice(cart.totalPrice);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                if (error instanceof Error) {
                    alert(`Error: ${error.message}`);
                } else {
                    alert('An unknown error occurred.');
                }
            }
        };

        fetchCartItems();
    }, [router]);

    const handleCreateOrder = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                alert('You must be logged in to create an order.');
                return;
            }
            await OrderService.createOrder(token);
            alert('Order created successfully!');
            // Optionally, clear the cart state here
        } catch (error) {
            console.error('Error creating order:', error);
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert('An unknown error occurred.');
            }
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await CartService.deleteProductFromCart(productId);
            setItems(items.filter(item => item.id !== productId));
            const updatedTotalPrice = items.reduce((total, item) => total + item.price, 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            alert('Failed to delete product from cart.');
        }
    };

    return (
        <div>
            <h1>Your Cart</h1>
            <Cart items={items} totalPrice={totalPrice} onDeleteProduct={handleDeleteProduct} />
            <button onClick={handleCreateOrder}>Create Order</button>
        </div>
    );
};

export default CartPage;