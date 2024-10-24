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
        this._privileges = administrative.privileges
    }
    public get privileges(): Privilege[] {
        return this._privileges;
    }

    public set privileges(value: Privilege[]) {
        this.privileges = value;
    }

}
