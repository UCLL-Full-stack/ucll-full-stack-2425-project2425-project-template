export class Category {
    private id?: number;
    private name: string;
    private description: string;

    constructor(category: {
        id?: number;
        name: string;
        description: string;
    }) {
        this.validate(category);

        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
    }

    validate(category: { id?: number; name: string; description: string; }) {
        throw new Error("Method not implemented.");
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    equals(category: Category): boolean {
        return (
            this.id === category.getId() &&
            this.name === category.getName() &&
            this.description === category.getDescription()
        );
    }
}