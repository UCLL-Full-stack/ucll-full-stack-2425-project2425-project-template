export class Status {
    private id?: number;
    private name: string;

    constructor(user: {
        id?: number;
        name: string;
    }) {
        this.id = user.id;
        this.name = user.name;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    // setters
    setName(name: string): void {
        this.name = name;
    }

    // methods
    equals(otherStatus: Status): boolean {
        return (
            this.name === otherStatus.getName()
        );
    }
}
