import bcrypt from "bcrypt";
import { User as UserPrisma } from '@prisma/client';
import { Vehicle as VehiclePrisma } from '@prisma/client';
import { Vehicle } from "./vehicle";
import { VehicleInput } from "../../types";



export class User {
    readonly id?: number | undefined;
    readonly email: string;
    readonly name: string;
    private password: string;
    readonly phoneNumber: number;
    // private listOfCarsForSelling: Vehicle[];
    // private listOfFavoriteCars: Vehicle[]

    constructor(user: {
        id?: number;
        email: string;
        name: string;
        password: string;
        phoneNumber: number;
        // listOfCarsForSelling: Vehicle[];
        // listOfFavoriteCars: Vehicle[];
    }) {

        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.password = user.password;
        this.phoneNumber = user.phoneNumber;
        // this.listOfCarsForSelling = user.listOfCarsForSelling || [];
        // this.listOfFavoriteCars = user.listOfFavoriteCars || [];
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
    // getlistOfCarsForSelling(): Vehicle[] {
    //     return this.listOfCarsForSelling;
    // }
    // getlistOfFavoriteCars(): Vehicle[] {
    //     return this.listOfFavoriteCars;
    // }

    // addCarForSelling(car: Vehicle): void {
    //     this.listOfCarsForSelling.push(car);
    // }

    static from({
        id, email, name, password, phoneNumber, 
        // listOfCarsForSelling,
    }: UserPrisma) {
        return new User({
            id,
            email,
            name,
            password,
            phoneNumber,
            // listOfCarsForSelling: Vehicle.from(listOfCarsForSelling)
        });
    }
}
