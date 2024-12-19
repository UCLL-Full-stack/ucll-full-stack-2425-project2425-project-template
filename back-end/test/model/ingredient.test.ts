import { Ingredient } from "../../model/ingredient"


test('given: valid values for ingredient, when: ingredient is created, then: ingredient is created with those values', () => {
    // given
    const naam = "Cherry Tomato";
    const type = "Topping";
    const aantal = 18;
    const prijs = 0.98;

    // when
    const ingredient = new Ingredient({ naam, type, aantal, prijs });

    // then
    expect(ingredient.getNaam()).toEqual(naam);
    expect(ingredient.getType()).toEqual(type);
    expect(ingredient.getAantal()).toEqual(aantal);
    expect(ingredient.getPrijs()).toEqual(prijs);
});

test('given: empty naam, when: ingredient is created, then: an error is thrown', () => {
    // given
    const emptyNaam = "";
    const type = "Topping";
    const aantal = 18;
    const prijs = 0.98;

    // when
    const ingredient = () =>
        new Ingredient({ naam: emptyNaam, type, aantal, prijs });

    // then
    expect(ingredient).toThrow('Naam cannot be empty');
});

test('given: empty aantal, when: ingredient is created, then: an error is thrown', () => {
    // given
    const naam = "Corn";
    const type = "Topping";
    const emptyAantal = NaN;
    const prijs = 0.98;

    // when
    const ingredient = () =>
        new Ingredient({ naam: naam, type, aantal: emptyAantal, prijs });

    // then
    expect(ingredient).toThrow('Aantal cannot be empty');
});

test('given: negative aantal, when: ingredient is created, then: an error is thrown', () => {
    // given
    const naam = "Corn";
    const type = "Topping";
    const negativeAantal = -1;
    const prijs = 0.98;

    // when
    const ingredient = () =>
        new Ingredient({ naam: naam, type, aantal: negativeAantal, prijs });

    // then
    expect(ingredient).toThrow('Aantal must be a positive number');
});

test('given: empty prijs, when: ingredient is created, then: an error is thrown', () => {
    // given
    const naam = "Corn";
    const type = "Topping";
    const aantal = 18;
    const emptyPrijs = NaN;

    // when
    const ingredient = () =>
        new Ingredient({ naam, type, aantal, prijs: emptyPrijs });

    // then
    expect(ingredient).toThrow('Prijs cannot be empty');
});

test('given: negative prijs, when: ingredient is created, then: an error is thrown', () => {
    // given
    const naam = "Corn";
    const type = "Topping";
    const aantal = 18;
    const negativePrijs = -9;

    // when
    const ingredient = () =>
        new Ingredient({ naam, type, aantal, prijs: negativePrijs });

    // then
    expect(ingredient).toThrow('Prijs must be a positive number');
});