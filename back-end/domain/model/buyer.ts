import { Car } from "./car";
import { User } from "./user";



export class Buyer extends User{

    favourite_cars : Car[];

    constructor(buyer: {
        id?: number, name: string,email: string
    }) {
        super({id: buyer.id, email: buyer.email, name: buyer.name});
        this.favourite_cars = [];
    }

    
}