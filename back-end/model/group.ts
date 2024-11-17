import { Board } from "./board";
import { User } from "./user";
import {
    User as UserPrisma,
    Group as GroupPrisma,
    Board as BoardPrisma,
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class Group {
    private id?: number;
    private name: string;
    private description: string;
    private createdAt: Date;
    private users: User[];
    private boards: Board[];

    constructor(user: {
        id?: number;
        name: string;
        description: string;
        createdAt: Date;
        users?: User[];
        boards?: Board[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.description = user.description;
        this.createdAt = user.createdAt;
        this.users = user.users || [];
        this.boards = user.boards || [];
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

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUsers(): User[] {
        return this.users;
    }

    getBoards(): Board[] {
        return this.boards;
    }

    // setters
    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    setBoards(boards: Board[]): void {
        this.boards = boards;
    }

    // methods
    addBoard(board: Board): void {
        if (!this.boards.some(b => b.equals(board))) {
            this.boards.push(board);
        }
    }

    addUser(user: User): void {
        if (!this.users.some(u => u.equals(user))) {
            this.users.push(user);
        }
    }

    equals(otherGroup: Group): boolean {
        return (
            this.name === otherGroup.getName() &&
            this.description === otherGroup.getDescription() &&
            this.createdAt === otherGroup.getCreatedAt() &&
            this.users.every((user, index) => {
                return user.equals(otherGroup.getUsers()[index]);
            }) &&
            this.boards.every((board, index) => {
                return board.equals(otherGroup.getBoards()[index]);
            })
        );
    }

    static from({
        id,
        name,
        description,
        createdAt,
        // users,
        boards
    }: GroupPrisma & { boards: (BoardPrisma & {statuses: (StatusPrisma & {tasks: TaskPrisma[]})[]})[]}): Group {
        return new Group({
            id,
            name,
            description,
            createdAt,
            // users: users ? users.map((user) => User.from(user)) : [],
            boards: boards ? boards.map((board) => Board.from(board)) : []
        })
    }
}
