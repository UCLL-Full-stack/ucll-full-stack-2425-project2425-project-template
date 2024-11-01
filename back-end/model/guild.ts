import { PermissionEntry } from "../types";
import { Role } from "./role";

export class Guild{
    private guildId: string;
    private guildName: string;
    private settings: PermissionEntry[];
    private roles: Role[];

    constructor(guildId: string, guildName: string, settings: PermissionEntry[], roles: Role[]){
        this.validate(guildId, guildName);
        this.guildId = guildId;
        this.guildName = guildName;
        this.settings = settings;
        this.roles = roles;
    }

    public setGuildId(guildId: string): void{
        this.guildId = guildId;
    }

    public setGuildName(guildName: string): void{
        this.guildName = guildName;
    }


    public setSettings(settings: PermissionEntry[]): void{
        this.settings = settings;
    }

    public setRoles(roles: Role[]): void{
        this.roles = roles;
    }

    public addRole(role: Role): void{
        this.roles.push(role);
    }

    public removeRole(roleId: string): void{
        this.roles = this.roles.filter(role => role.getRoleId() !== roleId);
    }

    public getGuildId(): string{
        return this.guildId;
    }

    public getGuildName(): string{
        return this.guildName;
    }

    public getSettings(): PermissionEntry[]{
        return this.settings;
    }

    public getRoles(): Role[]{
        return this.roles;
    }

    addSettingsEntry(newEntry: PermissionEntry): void {
        const existingEntry = this.settings.find(entry => entry.identifier === newEntry.identifier);
        if (existingEntry) {
            newEntry.kanbanPermission.forEach(permission => {
                if (!existingEntry.kanbanPermission.includes(permission)) {
                    existingEntry.kanbanPermission.push(permission);
                }
            });
        } else {
            this.settings.push(newEntry);
        }
    }

    setSettingsEntries(newEntries: PermissionEntry[]): void {
        newEntries.forEach(newEntry => {
            const existingEntryIndex = this.settings.findIndex(entry => entry.identifier === newEntry.identifier);
            if (existingEntryIndex !== -1) {
                this.settings[existingEntryIndex] = newEntry;
            } else {
                this.settings.push(newEntry);
            }
        });
    }

    removeSettingsEntry(identifier: string): void {
        this.settings = this.settings.filter(entry => entry.identifier !== identifier);
    }


    public validate(guildId: string, guildName: string): void{
        if(!guildId){
            throw new Error("Guild ID is required");
        }
        if(!guildName){
            throw new Error("Guild Name is required");
        }
    }
}