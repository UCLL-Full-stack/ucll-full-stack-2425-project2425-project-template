import { Animal } from "../../model/animal";
import { Caretaker } from "../../model/caretaker";
import { User } from "../../model/user";


const user1 = new User({
    username: 'user1',
    password: 'password1',
    role: 'caretaker'
});

const animal1 = new Animal({
    name: 'animal1',
    age: 1,
    species: 'species1',
    favouriteFood: 'food1',
    favouritetoy: 'toy1',
    costPerMonth: 100,
    costPerMonthPerSpecies: 100,
    caretakers: [],
});

const animal2 = new Animal({
    name: 'animal2',
    age: 2,
    species: 'species2',
    favouriteFood: 'food2',
    favouritetoy: 'toy2',
    costPerMonth: 200,
    costPerMonthPerSpecies: 200,
    caretakers: [],
});

test("given: valid values for Caretaker, when: Caretaker is created, then: Caretaker is created with those values", () => {
    const caretaker = new Caretaker({
        user: user1,
        name: 'caretaker1',
        
    });
    expect(caretaker.getUser()).toEqual(user1);
    
});