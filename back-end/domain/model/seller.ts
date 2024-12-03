import { Car } from "./car";
import { User } from "./user";

export class Seller extends User {
   
    listOfCarsForSelling: Car[];

    constructor(seller: {
        id?: number,
        name: string,
        password: string,
        phoneNumber: number, 
        email: string
    }) {
        super({ id: seller.id, email: seller.email, name: seller.name, password: seller.password, phoneNumber: seller.phoneNumber});
        
        this.listOfCarsForSelling = [];
    }

    getListOfCars(): Car[] {
        return this.listOfCarsForSelling
    }

}