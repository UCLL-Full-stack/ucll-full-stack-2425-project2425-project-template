export class User {
    private id?: number;
    private userName: string;
    private password: string;
    //profile to be added

    constructor(user: { userName: string; password: string }) {
        this.validate(user);
        this.userName = user.userName;
        this.password = user.password;
    }

    validate(user: { userName: string; password: string }) {
        if (!user.userName) throw new Error('Username is required.');
        if (!user.password) throw new Error('Password is required.');
        //profile to be added
    }

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }
}
