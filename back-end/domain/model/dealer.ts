import { Car } from "./car";
import { User } from "./user";

export class Dealer extends User {
    constructor(dealer: {
        id?: number,
        email: string,
        name: string,
        password: string,
        phoneNumber: number,
        listOfCarsForSelling: Car[],
        listOfFavoriteCars: Car[]
    }) {
        super(dealer);
        this.listOfCarsForSelling = dealer.listOfCarsForSelling;
        this.listOfFavoriteCars = dealer.listOfFavoriteCars;
    }

    listOfCarsForSelling: Car[];
    listOfFavoriteCars: Car[];
}