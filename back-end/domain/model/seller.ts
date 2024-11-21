import { Car } from "./car";
import { User } from "./user";

export class Seller extends User {
   
    list_of_cars: Car[];

    constructor(seller: {
        id?: number,
        name: string,
        password: string,
        phoneNumber: number, 
        email: string
    }) {
        super({ id: seller.id, email: seller.email, name: seller.name, password: seller.password, phoneNumber: seller.phoneNumber});
        
        this.list_of_cars = [];
    }

    getListOfCars(): Car[] {
        return this.list_of_cars
    }

}