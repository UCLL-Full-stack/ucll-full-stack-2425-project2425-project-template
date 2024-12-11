// User model
export interface User {
    id: number;
    role: UserRole;
    email: string;
    password: string;
    orders: Order[];
}

// Order model
export interface Order {
    id: number;
    userId: number;
    totalPrice: number;
    status: OrderStatus;
    user: User;
    items: OrderItem[];
}

// Product model
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description?: string;
    orderItems: OrderItem[];
    categories: ProductCategory[];
}

// OrderItem model
export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    finalPrice: number;
    order: Order;
    product: Product;
}

// Category model
export interface Category {
    id: number;
    name: string;
    description?: string;
    products: ProductCategory[];
}

// ProductCategory model
export interface ProductCategory {
    categoryId: number;
    productId: number;
    category: Category;
    product: Product;
}

// Enums
export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
}
