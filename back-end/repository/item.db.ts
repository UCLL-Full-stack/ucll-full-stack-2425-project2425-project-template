import { Item } from '../model/item';
import { Nutritionlabel } from '../model/nutritionlabel';

const items = [
    new Item({
        id: 0,
        name: 'Strawberry',
        price: 0.99,
        pathToImage:
            'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 1,
        name: 'Kaki',
        price: 3.99,
        pathToImage:
            'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 2,
        name: 'Banana',
        price: 0.49,
        pathToImage:
            'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 3,
        name: 'Kiwi',
        price: 1.39,
        pathToImage:
            'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 4,
        name: 'Blueberries',
        price: 3.49,
        pathToImage:
            'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
        category: 'fruits',
    }),
    new Item({
        id: 5,
        name: 'Plum',
        price: 0.79,
        pathToImage:
            'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 6,
        name: 'Dragonfruit',
        price: 4.99,
        pathToImage:
            'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 7,
        name: 'Coconut',
        price: 2.99,
        pathToImage:
            'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg?im=Resize=(420,420)',
        category: 'fruits',
    }),
];

const getAll = (): Item[] => {
    try {
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all items');
    }
};

const create = (item: Item): Item => {
    try {
        item.setId(items.length);

        const exists = items.find((existingItem) => existingItem.getId() === item.getId());

        if (exists) {
            throw new Error('Item already exists');
        }

        items.push(item);
        return item;
    } catch (error) {
        console.error('Error creating item:', error);
        throw new Error('Could not create item');
    }
};

const getById = (id: number): Item | undefined => {
    try {
        return items.find((item) => item.getId() === id);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get item by id');
    }
};

const addNutritionlabel = (item: Item, nutritionlabel: Nutritionlabel): Item => {
    try {
        item.setNutritionLabel(nutritionlabel);
        return item;
    } catch (error) {
        console.log(error);
        throw new Error('Could not add nutritionlabel to item');
    }
};

export default {
    getAll,
    create,
    getById,
    addNutritionlabel,
};
