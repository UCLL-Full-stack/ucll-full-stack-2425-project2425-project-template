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

interface CartItem extends Product {
    quantity: number;
}

const CartPage = () => {
    const [items, setItems] = useState<CartItem[]>([]);
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
                const productMap: { [key: number]: CartItem } = {};

                products.forEach((product: Product) => {
                    if (productMap[product.id]) {
                        productMap[product.id].quantity += 1;
                    } else {
                        productMap[product.id] = { ...product, quantity: 1 };
                    }
                });

                const cartItems = Object.values(productMap);
                setItems(cartItems);
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
            setItems(prevItems => {
                const updatedItems = prevItems.map(item => {
                    if (item.id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                }).filter(item => item.quantity > 0);
                const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
                setTotalPrice(updatedTotalPrice);
                return updatedItems;
            });
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