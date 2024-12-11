import { ProductCategory } from './ProductCategory';

export class Category {
    constructor(
        public id: number,
        public name: string,
        public description: string | null = null,
        public products: ProductCategory[] = []
    ) {}

    static from(prismaCategory: any): Category {
        return new Category(
            prismaCategory.id,
            prismaCategory.name,
            prismaCategory.description || null,
            prismaCategory.products?.map(ProductCategory.from) || []
        );
    }

    validate() {
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Category name cannot be empty.');
        }
    }
}
