export class Board {
    private id?: number;
    private name: string;
    private description: string;
    private updatedAt: Date;

    constructor(user: {
        id?: number;
        name: string;
        description: string;
        updatedAt: Date;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
        this.updatedAt = user.updatedAt;
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

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // setters
    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    // methods
    equals(otherBoard: Board): boolean {
        return (
            this.name === otherBoard.getName() &&
            this.description === otherBoard.getDescription() &&
            this.updatedAt === otherBoard.getUpdatedAt()
        );
    }
}
