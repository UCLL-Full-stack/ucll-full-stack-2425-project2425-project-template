import { Car } from "./car";
import { Vehicle } from "./vehicle";

export class User {
    readonly id?: number | undefined;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly phoneNumber: number;


    constructor(user: {
        id?: number,
        email: string,
        name: string,
        password: string,
        phoneNumber: number
    }) {

        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.password = user.password;
        this.phoneNumber = user.phoneNumber;
        listOfCarsForSelling: Vehicle: [];
        listOfFavoriteCars: Vehicle: [];
    }

    getId(): number | undefined {
        return this.id
    }

    getEmail(): string {
        return this.email
    }

    getName(): string {
        return this.name
    }

}

