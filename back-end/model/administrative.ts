// administrative.ts
import { User } from "./user";
import { Privilege } from "./privilege";

export class Administrative extends User {
    private _privileges: Privilege[];

    constructor(administrative: { id: number; name: string; email: string; password: string; privileges: Privilege[] }) {
        super({
            id: administrative.id,
            name: administrative.name,
            email: administrative.email,
            password: administrative.password,
        });
        if (!administrative.privileges || administrative.privileges.length === 0) {
            throw new Error("Privileges are required for administrative users.");
        }
        this._privileges = administrative.privileges;
    }

    public get privileges(): Privilege[] {
        return this._privileges;
    }

    public set privileges(value: Privilege[]) {
        if (!value || value.length === 0) {
            throw new Error("Privileges cannot be empty.");
        }
        this._privileges = value;
    }
}
