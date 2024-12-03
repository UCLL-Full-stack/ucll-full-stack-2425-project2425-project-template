import { Car } from "./car";
import { User } from "./user";



export class Buyer extends User{

    favourite_cars : Car[];

    constructor(buyer: {
        id?: number,
        name: string,
        email: string,
        password: string,
        phoneNumber: number
    }) {
        super({id: buyer.id, email: buyer.email, name: buyer.name, password: buyer.password, phoneNumber: buyer.phoneNumber });
        this.favourite_cars = [];
    }

    
}