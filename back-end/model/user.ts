import { Group } from "./group";
import { Profile } from "./profile";
import { Task } from "./task";

export class User {
    private id?: number;
    private username: string;
    private hashedPassword: string;
    private profile?: Profile;
    private groups: Group[];
    private tasks: Task[];

    constructor(user: {
        id?: number;
        username: string;
        hashedPassword: string;
        profile?: Profile;
        groups?: Group[];
        tasks?: Task[];
    }) {
        this.id = user.id;
        this.username = user.username;
        this.hashedPassword = user.hashedPassword;
        this.profile = user.profile || undefined;
        this.groups = user.groups || [];
        this.tasks = user.tasks || [];
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getHashedPassword(): string {
        return this.hashedPassword;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    getGroups(): Group[] {
        return this.groups;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    // setters
    setUsername(username: string): void {
        this.username = username;
    }

    setHashedPassword(hashedPassword: string): void {
        this.hashedPassword = hashedPassword;
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    setGroups(groups: Group[]): void {
        this.groups = groups;
    }

    setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    // methods
    equals(otherUser: User): boolean {
        let profilesAreEqual = true;
        if (this.profile && otherUser.getProfile()) {
            profilesAreEqual = this.profile.equals(otherUser.getProfile()!);
        } else if (this.profile || otherUser.getProfile()) {
            profilesAreEqual = false;
        }

        return (
            this.username === otherUser.getUsername() &&
            this.hashedPassword === otherUser.getHashedPassword() &&
            profilesAreEqual &&
            this.groups.every((group, index) => {
                return group.equals(otherUser.getGroups()[index]);
            }) &&
            this.tasks.every((task, index) => {
                return task.equals(otherUser.getTasks()[index]);
            })
        );
    }
}
