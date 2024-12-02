import { Status } from "./status";
import {
    Board as BoardPrisma,
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class Board {
    private id?: number;
    private name: string;
    private description: string;
    private updatedAt: Date;
    private statuses: Status[];

    constructor(user: {
        id?: number;
        name: string;
        description: string;
        updatedAt: Date;
        statuses?: Status[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
        this.updatedAt = user.updatedAt;
        this.statuses = user.statuses || [];
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

    getStatuses(): Status[] {
        return this.statuses;
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

    setStatuses(statuses: Status[]): void {
        this.statuses = statuses;
    }

    // methods
    addStatus(status: Status): void {
        if (!this.statuses.some(s => s.equals(status))) {
            this.statuses.push(status);
        }
    }

    equals(otherBoard: Board): boolean {
        return (
            this.name === otherBoard.getName() &&
            this.description === otherBoard.getDescription() &&
            this.updatedAt === otherBoard.getUpdatedAt() &&
            this.statuses.every((status, index) => {
                return status.equals(otherBoard.getStatuses()[index]);
            })
        );
    }

    static from({
        id,
        name,
        description,
        updatedAt,
        statuses
    }: BoardPrisma & { statuses: (StatusPrisma & { tasks: TaskPrisma[] })[] }): Board {
        return new Board({
            id,
            name,
            description,
            updatedAt,
            statuses: statuses.map((status) => Status.from(status))
        });
    }
}
