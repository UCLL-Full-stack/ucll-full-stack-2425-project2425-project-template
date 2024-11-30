import { Category as categoryPrisma } from '@prisma/client';
export class Category {
    private id?: number;
    private name: string;
    private description: string;

    constructor(category: { id?: number; name: string; description: string }) {
        this.validate(category);
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
    }

    validate(category: { name: string; description: string }) {
        if (!category.name?.trim()) throw new Error('Name is required.');
        if (!category.description?.trim()) throw new Error('Description is required.');
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

    static from({ id, name, description }: categoryPrisma) {
        return new Category({ id, name, description });
    }
}
