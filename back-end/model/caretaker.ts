import { Animal } from './animal';
import { User } from './user';
import { Caretaker as CaretakerPrisma, User as UserPrisma } from "@prisma/client";

export class Caretaker {
    private id?: number;
    private user: User;
    private name: string;

    constructor(caretaker: { id?: number; user: User; name: string }) {
        if (!caretaker.user) {
            throw new Error("User is required.");
        }
        if (!caretaker.name || caretaker.name.trim() === "") {
            throw new Error("Name is required and cannot be empty.");
        }

        this.id = caretaker.id;
        this.name = caretaker.name;
        this.user = caretaker.user;
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

    validate(caretaker: {user: User; name: string}) {
        if (!caretaker.user.isCaretaker()) {
            throw new Error('User must be caretaker.');
        }
        if (!caretaker.name?.trim()) {
            throw new Error('Name is required and cannot be empty.');
        }
    }

    static from({
        id,
        user,
        name,
    }: CaretakerPrisma & { user: UserPrisma }) {
        return new Caretaker({
            id,
            user: User.from(user),
            name,
        })
    }

    equals(caretaker: Caretaker): boolean {
        return (
            this.id === caretaker.getId() &&
            this.user.equals(caretaker.getUser())
        );
    }
}
