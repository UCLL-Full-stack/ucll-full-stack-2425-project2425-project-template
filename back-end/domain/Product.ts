import { OrderItem } from './OrderItem';
import { ProductCategory } from './ProductCategory';

export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number,
        public description: string | null = null,
        public orderItems: OrderItem[] = [],
        public categories: ProductCategory[] = []
    ) {}

    static from(prismaProduct: any): Product {
        return new Product(
            prismaProduct.id,
            prismaProduct.name,
            prismaProduct.price,
            prismaProduct.stock,
            prismaProduct.description || null,
            prismaProduct.orderItems?.map(OrderItem.from) || [],
            prismaProduct.categories?.map(ProductCategory.from) || []
        );
    }

    validate() {
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Product name cannot be empty.');
        }
        if (this.price <= 0) {
            throw new Error('Product price must be greater than zero.');
        }
        if (this.stock < 0) {
            throw new Error('Stock cannot be negative.');
        }
    }
}
