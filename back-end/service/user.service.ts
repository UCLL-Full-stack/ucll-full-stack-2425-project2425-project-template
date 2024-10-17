import { Seller } from "../domain/model/seller";
import { User } from "../domain/model/user";
import UserDb from "../domain/data-access/user.db";
import { SellerInput } from "../types";


const getAllUSers = async (): Promise<User[]> => UserDb.getAllUsers();

// const createSeller = ({email, name,phone_number }: SellerInput): Seller => {

// return null;
// }

export default { getAllUSers };