export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private age: number;
    private administrator: boolean;
    //location to be added
    //category to be added

    constructor(profile: {
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        administrator: boolean;
    }) {
        this.validate(profile);
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
        this.age = profile.age;
        this.administrator = profile.administrator;
    }

    validate(profile: {
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        administrator: boolean;
    }) {
        if (!profile.firstName) throw new Error('First name is required.');
        if (!profile.lastName) throw new Error('Last name is required.');
        if (!profile.email) throw new Error('Email is required.');
        if (!profile.age) throw new Error('Age is required.');
        //location to be added
        //category to be added
    }

    isAdmin(): boolean {
        return this.administrator;
    }
    getAge(): number {
        return this.age;
    }
    getEmail(): string {
        return this.email;
    }
    getLastName(): string {
        return this.lastName;
    }
    getFirstName(): string {
        return this.firstName;
    }
}
