export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private description: string;
    private stock: number;

    constructor(product:{id?: number, name: string, price: number, description: string, stock: number}) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStock(): number {
        return this.stock;
    }

    equals(product: Product): boolean {
        return (
            this.id === product.getId() &&
            this.name === product.getName() &&
            this.price === product.getPrice() &&
            this.description === product.getDescription() &&
            this.stock === product.getStock()
        )
    }
}