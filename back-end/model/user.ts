export class User {
    private id?: number;
    private name: string;
    private password: string;

    //ROLE MOET NOG GEIMPLEMENTEERD WORDEN

    constructor(user: {
        id?: number;
        name: string;
        password: string;
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    validate(user: {
        name: string;
        password: string;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.name === user.getName() &&
            this.password === user.getPassword() &&
        );
    }
}
