import { User } from './user';
import { Manager as ManagerPrisma, User as UserPrisma } from '@prisma/client';

export class Manager {
    private id?: number;
    private user: User;
    private name: string;

    constructor(manager: { id?: number; user: User; name: string }) {
        this.validate(manager);

        this.id = manager.id;
        this.name = manager.name;
        this.user = manager.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getName(): string {
        return this.name;
    }

    validate(manager: {user: User; name: string}) {
        if (!manager.user.isManager()) {
            throw new Error('User must be manager.');
        }
        if (!manager.name?.trim()) {
            throw new Error('Name is required and cannot be empty.');
        }
    }

    static from({
        id,
        user,
        name,
    }: ManagerPrisma & {user: UserPrisma}) {
        return new Manager({
            id,
            user: User.from(user),
            name,
        })
    };

    equals(manager: Manager): boolean {
        return this.id === manager.getId() && this.user.equals(manager.getUser());
    }
}
