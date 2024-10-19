import ShoppingList from "../../model/shoppingList";
import Item from "../../model/item";

// Global constants for valid inputs
const validListName = "Test List";
const item1 = new Item({ name: "Item 1", description: "Description 1", price: 10, urgency: "High Priority" })
const item2 = new Item({ name: "Item 2", description: "Description 2", price: 20, urgency: "Not a Priority" })
const validItems = [
    item1,
    item2
];

test('given valid ListName and items; when creating a ShoppingList; then it should create the ShoppingList correctly', () => {
    const newList = new ShoppingList({ ListName: validListName, items: validItems });
    expect(newList.getListName()).toBe(validListName);
    expect(newList.getListItems()).toEqual(validItems);
});

test('given no ListName and valid items; when creating a ShoppingList; then it should create the ShoppingList with default ListName', () => {
    const newList = new ShoppingList({ items: validItems });
    expect(newList.getListName()).toBe("General list");
    expect(newList.getListItems()).toEqual(validItems);
});

test('given valid ListName and no items; when creating a ShoppingList; then it should create the ShoppingList with empty items array', () => {
    const newList = new ShoppingList({ ListName: validListName });
    expect(newList.getListName()).toBe(validListName);
    expect(newList.getListItems()).toEqual([]);
});

test('given no ListName and no items; when creating a ShoppingList; then it should create the ShoppingList with default ListName and empty items array', () => {
    const newList = new ShoppingList({});
    expect(newList.getListName()).toBe("General list");
    expect(newList.getListItems()).toEqual([]);
});

test('given invalid ListName; when creating a ShoppingList; then it should throw an error', () => {
    expect(() => {
        new ShoppingList({ ListName: 123 as any, items: validItems });
    }).toThrow('Invalid ListName value');
});

test('given empty ListName; when creating a ShoppingList; then it should throw an error', () => {
    expect(() => {
        new ShoppingList({ ListName: "", items: validItems });
    }).toThrow('Invalid ListName value');
});

test('given ListName longer than 40 characters; when creating a ShoppingList; then it should throw an error', () => {
    expect(() => {
        new ShoppingList({ ListName: "a".repeat(41), items: validItems });
    }).toThrow('Invalid ListName value');
});

test('given invalid items; when creating a ShoppingList; then it should throw an error', () => {
    expect(() => {
        new ShoppingList({ ListName: validListName, items: "invalid" as any });
    }).toThrow('Invalid items value');
});

test('given items array with invalid item; when creating a ShoppingList; then it should throw an error', () => {
    expect(() => {
        new ShoppingList({ ListName: validListName, items: [item1, "invalid" as any] });
    }).toThrow('Invalid item in items array');
});

test('given valid item; when adding an item; then it should add the item to the list', () => {
    const newList = new ShoppingList({ ListName: validListName, items: validItems });
    const newItem = new Item({ name: "Item 3", description: "Description 3", price: 30, urgency: "Not a Priority" });
    newList.addItem(newItem);
    expect(newList.getListItems()).toContain(newItem);
});

test('given invalid item; when adding an item; then it should throw an error', () => {
    const newList = new ShoppingList({ ListName: validListName, items: validItems });
    expect(() => {
        newList.addItem("invalid" as any);
    }).toThrow('Invalid item');
});

test('given existing item name; when removing an item; then it should remove the item from the list', () => {
    const newList = new ShoppingList({ ListName: validListName, items: validItems });
    newList.removeItem("Item 1");
    expect(newList.getListItems().find(item => item.getName() === "Item 1")).toBeUndefined();
});

test('given non-existing item name; when removing an item; then it should not change the list', () => {
    const newList = new ShoppingList({ ListName: validListName, items: validItems });
    newList.removeItem("Non-existing Item");
    expect(newList.getListItems()).toEqual(validItems);
});