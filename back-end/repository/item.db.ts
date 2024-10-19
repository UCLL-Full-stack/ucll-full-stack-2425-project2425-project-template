import Item from "../model/item";

const items: Array<Item> = [];    

const saveItem = (item: Item): Item => {
    items.push(item);
    return item;
};

const getItemByName = ({name}: {name: string}): Item | undefined => {
    try {
        return items.find((item) => {item.getName() === name}) || undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const removeItem = (name: string): void => {
    const index = items.findIndex(item => item.getName() === name);
    if (index !== -1) {
        items.splice(index, 1);
    } else {
        throw new Error(`Item with name ${name} not found.`);
    }
};

const getAllItems = ():Array<Item> => {
    return items;
};

const createTestItems = (): void => {
    const item1 = new Item({ name: "Milk", description: "1 gallon of whole milk", price: 3.99, urgency: "High Priority" });
    const item2 = new Item({ name: "Bread", description: "Whole grain bread", price: 2.49, urgency: "Not a Priority" });
    const item3 = new Item({ name: "Eggs", description: "1 dozen large eggs", price: 2.99, urgency: "Low Priority" });
    const item4 = new Item({ name: "Butter", description: "Salted butter, 1 lb", price: 4.99, urgency: "High Priority" });
    const item5 = new Item({ name: "Cheese", description: "Cheddar cheese, 1 lb", price: 5.99, urgency: "Not a Priority" });
    saveItem(item1);
    saveItem(item2);
    saveItem(item3);
    saveItem(item4);
    saveItem(item5);
};
createTestItems();

export default {saveItem,
                getItemByName,
                removeItem,
                getAllItems,
                
                };