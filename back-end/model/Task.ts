import {Task as TaskPrisma} from "@prisma/client"; 

export class Task {
    private id?: number;
    private date: Date;
    private time: Date;
    private description: string;
    private status: string;
    private comment: string;

    constructor(task: {
        id?: number;
        date: Date;
        time: Date;
        description: string;
        status: string;
        comment: string;
    }) {
        this.id = task.id;
        this.date = task.date;
        this.time = task.time;
        this.description = task.description;
        this.status = task.status;
        this.comment = task.comment;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date{
        return this.date;
    }

    getTime(): Date {
        return this.time;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): string {
        return this.status;
    }

    getComment(): string {
        return this.comment;
    }

    static from({
        id,
        date,
        time,
        description,
        status,
        comment,
    }: TaskPrisma) {
        return new Task ({
            id,
            date,
            time,
            description,
            status,
            comment,
        })
    }

}
