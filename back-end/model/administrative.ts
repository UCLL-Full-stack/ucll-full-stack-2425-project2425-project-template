// administrative.ts
import { User } from "./user";

export class Administrative extends User {
    constructor(administrative: { id: number; name: string; email: string; password: string }) {
        super({
            id: administrative.id,
            name: administrative.name,
            email: administrative.email,
            password: administrative.password,
        });
    }
}
