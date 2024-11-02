
import { Animal } from '../model/animal';
import { Caretaker } from '../model/caretaker';
import { User } from '../model/user';


const user1 =  new User({
        id: 1,
        username: 'caretaker1',
        password: 'caretaker1',
        role: 'caretaker'
})
const user2 =  new User({
        id: 2,
        username: 'caretaker2',
        password: 'caretaker2',
        role: 'caretaker'
})


const caretaker1 = new Caretaker({ 
    id: 1,
    user: user1,
    name: 'caretaker1'
    
});

const caretaker2 = new Caretaker({ 
    id: 2,
    user: user2,
    name: 'caretaker2'
    
});

const animals = [
    new Animal({
        id: 1,
        name: 'Rex',
        age: 5,
        species: 'Dog',
        favouriteFood: 'Meat',
        favouritetoy: 'Ball',
        costPerMonth: 100,
        costPerMonthPerSpecies: 100,
        caretakers: []
    }),
    new Animal({
        id: 2,
        name: 'Mittens',
        age: 3,
        species: 'Cat',
        favouriteFood: 'Fish',
        favouritetoy: 'String',
        costPerMonth: 50,
        costPerMonthPerSpecies: 50,
        caretakers: []
    }),
    new Animal({
        id: 3,
        name: 'Squawks',
        age: 1,
        species: 'Parrot',
        favouriteFood: 'Seeds',
        favouritetoy: 'Mirror',
        costPerMonth: 25,
        costPerMonthPerSpecies: 25,
        caretakers: []
    }),
    
];

animals[0].addCaretaker(caretaker1);
animals[1].addCaretaker(caretaker1);
animals[1].addCaretaker(caretaker2);
animals[2].addCaretaker(caretaker2);


const getAllAnimals = (): Animal[] => {
    return animals;
};

export default { getAllAnimals };

