import ShoppingListService from "../../service/shoppingList.service";
import shoppingListDb from "../../repository/shoppingList.db";
import Item from "../../model/item";
import ShoppingList from "../../model/shoppingList";

const validListName = "Groceries";
const itemInput1 = { name: "Milk", description: "1 gallon of whole milk", price: 3.99, urgency: "High Priority" };
const itemInput2 = { name: "Bread", description: "Whole grain bread", price: 2.49, urgency: "Not a Priority" };
const itemInput3 = { name: "Eggs", description: "1 dozen large eggs", price: 2.99, urgency: "Low Priority" };

const item1 = new Item(itemInput1);
const item2 = new Item(itemInput2);
const item3 = new Item(itemInput3);

jest.mock("../../repository/shoppingList.db");

const mockSaveShoppingList = shoppingListDb.saveShoppingList as jest.Mock;
const mockGetShoppingListByName = shoppingListDb.getShoppingListByName as jest.Mock;
const mockRemoveShoppingList = shoppingListDb.removeShoppingList as jest.Mock;
const mockAddItemToShoppingList = shoppingListDb.addItemToShoppingList as jest.Mock;
const mockRemoveItemFromShoppingList = shoppingListDb.removeItemFromShoppingList as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
});

test('given valid shopping list input; when adding a shopping list; then it should add the shopping list correctly', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1, itemInput2] };
    const newShoppingList = new ShoppingList({ ListName: validListName, items: [item1, item2] });
    mockSaveShoppingList.mockReturnValue(newShoppingList);

    // when
    const addedList = ShoppingListService.addShoppingList(shoppingListInput);

    // then
    expect(addedList.getListName()).toBe(validListName);
    expect(addedList.getListItems().length).toBe(2);
});

test('given existing shopping list name; when adding a shopping list; then it should throw an error', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1, itemInput2] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1, item2] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when & then
    expect(() => {
        ShoppingListService.addShoppingList(shoppingListInput);
    }).toThrow(`Shopping list with name ${validListName} already exists.`);
});

test('given valid shopping list name; when retrieving a shopping list; then it should return the shopping list', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1, itemInput2] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1, item2] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when
    const retrievedList = ShoppingListService.getShoppingList(validListName);

    // then
    expect(retrievedList).toBeDefined();
    expect(retrievedList?.getListName()).toBe(validListName);
    expect(mockGetShoppingListByName).toHaveBeenCalledWith(validListName);
});

test('given non-existing shopping list name; when retrieving a shopping list; then it should throw an error', () => {
    // given
    const nonExistingListName = "NonExistingList";
    mockGetShoppingListByName.mockReturnValue(undefined);

    // when & then
    expect(() => {
        ShoppingListService.getShoppingList(nonExistingListName);
    }).toThrow(`Shopping list with name ${nonExistingListName} does not exist.`);
});

test('given valid shopping list name; when removing a shopping list; then it should remove the shopping list', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1, itemInput2] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1, item2] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when
    ShoppingListService.removeShoppingList(validListName);

    // then
    expect(mockRemoveShoppingList).toHaveBeenCalledWith(validListName);
});

test('given non-existing shopping list name; when removing a shopping list; then it should throw an error', () => {
    // given
    const nonExistingListName = "NonExistingList";
    mockGetShoppingListByName.mockReturnValue(undefined);

    // when & then
    expect(() => {
        ShoppingListService.removeShoppingList(nonExistingListName);
    }).toThrow(`Shopping list with name ${nonExistingListName} does not exist.`);
});

test('given valid item input; when adding an item to a shopping list; then it should add the item correctly', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when
    ShoppingListService.addItemToShoppingList(validListName, itemInput2);

    // then
    expect(mockAddItemToShoppingList).toHaveBeenCalledWith(validListName, expect.any(Item));
});

test('given existing item name; when adding an item to a shopping list; then it should throw an error', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when & then
    expect(() => {
        ShoppingListService.addItemToShoppingList(validListName, itemInput1);
    }).toThrow(`Item with name ${itemInput1.name} already exists in the shopping list ${validListName}.`);
});

test('given valid item name; when removing an item from a shopping list; then it should remove the item', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1, itemInput2] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1, item2] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when
    ShoppingListService.removeItemFromShoppingList(validListName, itemInput1.name);

    // then
    expect(mockRemoveItemFromShoppingList).toHaveBeenCalledWith(validListName, itemInput1.name);
});

test('given non-existing item name; when removing an item from a shopping list; then it should throw an error', () => {
    // given
    const shoppingListInput = { ListName: validListName, items: [itemInput1] };
    const existingShoppingList = new ShoppingList({ ListName: validListName, items: [item1] });
    mockGetShoppingListByName.mockReturnValue(existingShoppingList);

    // when & then
    expect(() => {
        ShoppingListService.removeItemFromShoppingList(validListName, itemInput2.name);
    }).toThrow(`Item with name ${itemInput2.name} does not exist in the shopping list ${validListName}.`);
});