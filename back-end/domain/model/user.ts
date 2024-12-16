import { Car } from "./car";
import bcrypt from "bcrypt";


export class User {
    readonly id?: number | undefined;
    readonly email: string;
    readonly name: string;
    private password: string;
    readonly phoneNumber: string;


    constructor(user: {
        id?: number,
        email: string,
        name: string,
        password: string,
        phoneNumber: string
        listOfCarsForSelling: Car[];
        listOfFavoriteCars: Car[];
    }) {

        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.password = user.password;
        this.phoneNumber = user.phoneNumber;
        listOfCarsForSelling: Vehicle: [];
        listOfFavoriteCars: Vehicle: [];
    }

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
      }

    async validatePassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
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

