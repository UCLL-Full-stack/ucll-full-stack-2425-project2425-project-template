import { Car } from "./car";
import { User } from "./user";

export class Dealer extends User {
    constructor(dealer: {
        id?: number,
        email: string,
        name: string,
        password: string,
        dealer: boolean,
        phoneNumber: number,
        listOfCarsForSelling: Car[],
        listOfFavoriteCars: Car[]
    }) {
        super(dealer);
        this.listOfFavoriteCars = dealer.listOfFavoriteCars;
    }

    listOfFavoriteCars: Car[];
}