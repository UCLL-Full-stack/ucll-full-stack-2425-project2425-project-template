import { Job } from "../types/types";

export class Coach {
    readonly id: number;
    readonly name: string;
    readonly job: Job;

    constructor(coach: { id: number, name: string, job: Job }) {
        this.id = coach.id;
        this.name = coach.name;
        this.job = coach.job;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getJob(): Job {
        return this.job;
    }

    static from({ id, name, job }: { id: number, name: string, job: Job }): Coach {
        return new Coach({
            id,
            name,
            job: job as Job
        });
    }

    
    
}