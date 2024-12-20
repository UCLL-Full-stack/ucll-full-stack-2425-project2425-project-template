import { Address } from "../model/address";
import database from "./database";

const createAddress = async (address: Address & { userId: number }): Promise<void> => {
    try {
        await database.address.create({
            data: {
                city: address.getCity(),
                country: address.getCountry(),
                postCode: address.getPostCode(),
                street: address.getStreet(),
                houseNumber: address.getHouseNumber(),
                userId: address.userId
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

export default {
    createAddress,
}
