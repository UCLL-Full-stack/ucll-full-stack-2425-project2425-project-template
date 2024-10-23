import { Category } from '../../model/category';

test('Given valid Category when making new category then category is created.', () => {
    const category = new Category({ name: 'Festival', description: 'Test description' });
    expect(category.getName()).toEqual('Festival');
    expect(category.getDescription()).toEqual('Test description');
});

test('Given empty name when making new category then error is thrown', () => {
    expect(() => {
        const category = new Category({ name: '', description: 'Test description' });
    }).toThrow('Name is required.');
});

test('Given empty description when making new category then error is thrown', () => {
    expect(() => {
        const category = new Category({ name: 'Festival', description: '' });
    }).toThrow('Description is required.');
});
