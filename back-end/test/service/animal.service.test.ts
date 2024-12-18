import { Animal } from '../../model/animal';
import animalDb from '../../repository/animal.db';
import animalService from '../../service/animal.service';



const animalInput = {
    id: 1,
    name: 'Lion',
    age: 5,
    species: 'Panthera leo',
    favouriteFood: 'Meat',
    favouritetoy: 'Ball',
    costPerMonth: 200,
    costPerMonthPerSpecies: 250,
    caretakers: [],
};

const animal = new Animal(animalInput);

let getAllAnimalsMock: jest.Mock;

beforeEach(() => {
    getAllAnimalsMock = jest.fn();
    animalDb.getAllAnimals = getAllAnimalsMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: given valid values, when: animal is created, then: animal is created with those values', async () => {
    getAllAnimalsMock.mockReturnValue([animal]);

    const animals = await animalService.getAllAnimals();

    expect(getAllAnimalsMock).toHaveBeenCalledTimes(1);
    expect(animals).toEqual([animal]);
});


test('given: database call fails, when: getAllAnimals is called, then: an error is thrown', async () => {
    getAllAnimalsMock.mockReturnValue([]);
    

    await expect(animalService.getAllAnimals()).rejects.toThrow("Failed to retrieve animals.");
    expect(getAllAnimalsMock).toHaveBeenCalledTimes(1);
});        


