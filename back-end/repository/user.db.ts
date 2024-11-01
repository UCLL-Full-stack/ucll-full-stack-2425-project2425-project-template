import { Seller } from "../domain/model/seller";
import { User } from "../domain/model/user";

// const users: User[] = [
//     new Seller({
//         id: 1,
//         name: 'seller1',
//         email: 'seller1@gmail.com',
//         phone_number: 123456789
//     }),

//     new Buyer({
//         id: 2,
//         name: 'buyer1',
//         email: 'buyer1@example.com'
//     })
// ]

const users: User[] = [];

const createSeller = ({ id, email, name, phone_number }: Seller): Seller => {
    const newSeller = new Seller({ id, email, name, phone_number });
    users.push(newSeller);
    return newSeller;
}


const getAllUsers = (): User[] => users;


export default { getAllUsers }