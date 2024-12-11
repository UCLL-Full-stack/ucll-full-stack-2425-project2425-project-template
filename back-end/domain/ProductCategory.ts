export class ProductCategory {
    constructor(public categoryId: number, public productId: number) {}

    static from(prismaProductCategory: any): ProductCategory {
        return new ProductCategory(
            prismaProductCategory.categoryId,
            prismaProductCategory.productId
        );
    }
}
