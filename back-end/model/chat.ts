import { User } from "./user";

export class Chat {
    private id?: number;
    private message: string;
    private createdAt: Date;
    private user: User
    // private chat: string;

    constructor(chat: {
        id?: number;
        message: string;
        createdAt: Date;
        user: User;
    }) {
        this.id = chat.id;
        this.message = chat.message;
        this.createdAt = chat.createdAt;
        this.user = chat.user;
        // this.chat = user.chat;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getMessage(): string {
        return this.message;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUser(): User {
        return this.user;
    }

    
}
