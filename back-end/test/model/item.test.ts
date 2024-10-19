import Item from "../../model/item";

//global
const validName = "Test item";
const validDescription = "This is a test item";
const validPrice = 100
const validStringUrgency = "High Priority"
const validNumberUrgency = 3

test('given valid name, description, price, and urgency; when creating an item; then it should create the item correctly', () => {
    const newItem = new Item({ name: validName, description: validDescription, price: validPrice, urgency: validStringUrgency });
    expect(newItem.getName()).toBe(validName);
    expect(newItem.description).toBe(validDescription);
    expect(newItem.getPrice()).toBe(validPrice);
    expect(newItem.getUrgency()).toBe(validStringUrgency);
});

test('given valid name, description, and no urgency; when creating an item; then it should create the item with default urgency', () => {
    const newItem = new Item({ name: validName, description: validDescription, price: validPrice });
    expect(newItem.getName()).toBe(validName);
    expect(newItem.description).toBe(validDescription);
    expect(newItem.getPrice()).toBe(validPrice);
    expect(newItem.getUrgency()).toBe("Not a Priority");
});

test('given invalid name; when creating an item; then it should throw an error', () => {
    expect(() => {
        new Item({ name: 123 as any, description: validDescription, price: validPrice, urgency: validStringUrgency });
    }).toThrow('Invalid name value');
});

test('given invalid description; when creating an item; then it should throw an error', () => {
    expect(() => {
        new Item({ name: validName, description: 123 as any, price: validPrice, urgency: validStringUrgency });
    }).toThrow('Invalid description value');
});

test('given invalid price; when creating an item; then it should throw an error', () => {
    expect(() => {
        new Item({ name: validName, description: validDescription, price: '100' as any, urgency: validStringUrgency });
    }).toThrow('Invalid price value');
});

test('given invalid urgency string; when creating an item; then it should throw an error', () => {
    expect(() => {
        new Item({ name: validName, description: validDescription, price: validPrice, urgency: 'Very Urgent' });
    }).toThrow('Invalid urgency value');
});

test('given valid urgency number; when creating an item; then it should convert the number to corresponding string', () => {
    const newItem = new Item({ name: validName, description: validDescription, price: validPrice, urgency: validNumberUrgency });
    expect(newItem.getUrgency()).toBe(validStringUrgency);
});

test('given invalid urgency number; when creating an item; then it should throw an error', () => {
    expect(() => {
        new Item({ name: validName, description: validDescription, price: validPrice, urgency: 5 });
    }).toThrow('Invalid urgency value');
});