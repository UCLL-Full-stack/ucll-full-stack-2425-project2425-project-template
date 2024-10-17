import { Car } from "./car";
import { User } from "./user";

export class Seller extends User {
    readonly phone_number: number;
    list_of_cars: Car[];

    constructor(seller: {
        id?: number, name: string,
        phone_number: number, email: string
    }) {
        super({ id: seller.id, email: seller.email, name: seller.name });
        this.phone_number = seller.phone_number;
        this.list_of_cars = [];
    }

    getPhoneNumber(): number {
        return this.phone_number
    }

    getListOfCars(): Car[] {
        return this.list_of_cars
    }

}