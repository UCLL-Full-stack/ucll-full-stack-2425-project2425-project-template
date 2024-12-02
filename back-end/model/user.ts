import { Group } from "./group";
import { Profile } from "./profile";
import { Task } from "./task";
import {
    User as UserPrisma,
    Profile as ProfilePrisma,
    Group as GroupPrisma,
    Board as BoardPrisma,
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class User {
    private id?: number;
    private username: string;
    private hashedPassword: string;
    private profile?: Profile;
    private groups: Group[];

    constructor(user: {
        id?: number;
        username: string;
        hashedPassword: string;
        profile?: Profile;
        groups?: Group[];
    }) {
        this.id = user.id;
        this.username = user.username;
        this.hashedPassword = user.hashedPassword;
        this.profile = user.profile || undefined;
        this.groups = user.groups || [];
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
            })
        );
    }

    static from({
        id,
        username,
        hashedPassword,
        profile,
        groups,
    }: UserPrisma & { profile: ProfilePrisma | null, groups: (GroupPrisma & { boards: (BoardPrisma & {statuses: (StatusPrisma & {tasks: TaskPrisma[]})[]})[]})[]}) {
        return new User({
            id,
            username,
            hashedPassword,
            profile: profile ? Profile.from(profile) : undefined,
            groups: groups.map((group) => Group.from(group)),
        });
    }
}
