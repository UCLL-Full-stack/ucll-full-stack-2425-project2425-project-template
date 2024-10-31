import { User } from "./user";

export class Task {
    private id?: number;
    private name: string;
    private description: string;
    private priority: string;
    private storyPoints: number;
    private startDate: Date;
    private endDate: Date;
    private users: User[];

    constructor(user: {
        id?: number;
        name: string;
        description: string;
        priority: string;
        storyPoints: number;
        startDate: Date;
        endDate: Date;
        users?: User[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
        this.priority = user.priority;
        this.storyPoints = user.storyPoints;
        this.startDate = user.startDate;
        this.endDate = user.endDate;
        this.users = user.users || [];
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

    getPriority(): string {
        return this.priority;
    }

    getStoryPoints(): number {
        return this.storyPoints;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getUsers(): User[] {
        return this.users;
    }

    // setters
    setname(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setPriority(priority: string): void {
        this.priority = priority;
    }

    setStoryPoints(storyPoints: number): void {
        this.storyPoints = storyPoints;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    // methods
    addUser(user: User): void {
        if (!this.users.some(u => u.equals(user))) {
            this.users.push(user);
        }
    }

    equals(otherTask: Task): boolean {
        return (
            this.name === otherTask.getName() &&
            this.description === otherTask.getDescription() &&
            this.priority === otherTask.getPriority() &&
            this.storyPoints === otherTask.getStoryPoints() &&
            this.startDate === otherTask.getStartDate() &&
            this.endDate === otherTask.getEndDate() &&
            this.users.every((user, index) => {
                return user.equals(otherTask.getUsers()[index]);
            })
        );
    }
}
