export class User {
    readonly id: number;
    name: string;
    email: string;
    password: string;
   

    constructor(user: { id: number, name: string, email: string, password: string}) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    equals(otherUser: User): boolean {
        return (
            this.id === otherUser.id &&
            this.name === otherUser.name &&
            this.email === otherUser.email &&
            this.password === otherUser.password
        );
    }

}