import { Buyer } from "../model/buyer";
import { Car } from "../model/car";
import { Seller } from "../model/seller";
import { User } from "../model/user";

const users = [
    new Seller({
        id: 1,
        name: 'seller1',
        email: 'seller1@gmail.com',
        phone_number: 123456789
    }),

    new Buyer({
        id: 2,
        name: 'buyer1',
        email: 'buyer1@example.com'
    })
]