import { Car } from "./car";
import { User } from "./user";

export class Buyer extends User{

    private favourite_cars : Car[];

    constructor(seller: {
        id?: number, name: string,email: string
    }) {
        super({id: seller.id, email: seller.email, name: seller.name});
        this.favourite_cars = [];
    }

    
}