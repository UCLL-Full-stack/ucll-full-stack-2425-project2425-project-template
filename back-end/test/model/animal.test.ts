import { Animal } from "../../model/animal";
import { Caretaker } from "../../model/caretaker";
import { User } from "../../model/user";

const user1 = new User({
    username: 'user1',
    password: 'password1',
    role: 'admin'
});

const caretaker1 = new Caretaker({
    user: user1,
    name: 'caretaker1'
    
});

test("given: valid values for Animal, when: Animal is created, then: Animal is created with those values", () => {
    const animal = new Animal({
        name: 'animal1',
        age: 1,
        species: 'species1',
        favouriteFood: 'food1',
        favouritetoy: 'toy1',
        costPerMonth: 100,
        costPerMonthPerSpecies: 100,
        caretakers: [caretaker1],
    }); 
    expect(animal.getName()).toEqual('animal1');
    expect(animal.getAge()).toEqual(1);
    expect(animal.getSpecies()).toEqual('species1');
    expect(animal.getFavouriteFood()).toEqual('food1');
    expect(animal.getFavouriteToy()).toEqual('toy1');
    expect(animal.getCostPerMonth()).toEqual(100);
    expect(animal.getCostPerMonthPerSpecies()).toEqual(100);    
    expect(animal.getCaretakers()).toHaveLength(1);
    expect(animal.getCaretakers()).toEqual([caretaker1]);
}
);