export class Group {
    private id?: number;
    private name: string;
    private description: string;
    private createdAt: Date;

    constructor(user: {
        id?: number;
        name: string;
        description: string;
        createdAt: Date;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
        this.createdAt = user.createdAt;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    // setters
    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    // methods
    equals(otherGroup: Group): boolean {
        return (
            this.name === otherGroup.getName() &&
            this.description === otherGroup.getDescription() &&
            this.createdAt === otherGroup.getCreatedAt()
        );
    }
}
