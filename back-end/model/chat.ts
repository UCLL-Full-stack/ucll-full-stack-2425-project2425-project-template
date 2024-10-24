import { User } from "./user";

export class Chat {
    private id?: number;
    private message: string;
    private createdAt: Date;
    private userId?: number;
    

    constructor(chat: {
        id?: number;
        message: string;
        createdAt: Date;
        userId?: number;
    }) {
        this.validate(chat);
        this.id = chat.id;
        this.message = chat.message;
        this.createdAt = chat.createdAt;
        this.userId = chat.userId;
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

    public getUserId(): number|undefined {
        return this.userId;
    }

    validate(chat: { id?: number; message: string; createdAt: Date;userId?: number }): void {

        if (!chat.createdAt) {
            throw new Error('Chat creation date is required');
        }
    }

    
}
