import { User } from "../model/user";

const users: User[] = [
    new User({
        id: 1,
        naam: "Timmermans",
        voornaam: "Ashley",
        email: "ashley.timmermans@email.com",
        wachtwoord: "welkom123",
        adres: "Leuvensestraat 10",
        gebruikersnaam: "AshleyT",
        rol: "klant"
    }),
    new User({
        id: 2,
        naam: "de Weerd",
        voornaam: "Nina",
        email: "nina.deweerd@email.com",
        wachtwoord: "helloworld!",
        adres: "Heverleesestraat 20",
        gebruikersnaam: "NinadW",
        rol: "klant"
    }),
    new User({
        id: 3,
        naam: "Doe",
        voornaam: "John",
        email: "john.doe@email.com",
        wachtwoord: "password",
        adres: "Teststraat 123",
        gebruikersnaam: "JohnD",
        rol: "admin"
    }),
    new User({
        id: 4,
        naam: "Toe",
        voornaam: "Jane",
        email: "jane.toe@email.com",
        wachtwoord: "hihihi3",
        adres: "Teststraat 321",
        gebruikersnaam: "JaneT",
        rol: "manager"
    })
];

const getAllUsers = (): User[] => users;

const createUser = (user: User): User => {
    users.push(user);
    return user;
};


export default { createUser, getAllUsers };