import { Customer } from "../model/customer";

const customers: Customer[] = [
    new Customer({
        id: 1,
        password: "m@t3j-v3s3l",
        securityQuestion: "What is the name of the best friend from childhood?", // TODO: We also need security answer. It may also be a list.
        username: "Matej333",
        firstName: "Matej",
        lastName: "Vesel",
        phone: 333444555666
    })
];

const getCustomerById = (id: number): Customer | null => {
    return customers.find((customer) => customer.getId() === id) || null;
}

export default {
    getCustomerById
};