export class Category {
    private id?: number;
    private name: string;
    private description: string;

    constructor(category: { name: string; description: string }) {
        this.validate(category);
        this.name = category.name;
        this.description = category.description;
    }

    validate(category: { name: string; description: string }) {
        if (!category.name) throw new Error('Name is required.');
        if (!category.description) throw new Error('Description is required.');
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
}
