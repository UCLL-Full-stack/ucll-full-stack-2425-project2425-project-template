import { Ingredient } from "../../model/ingredient"
import { Pokebowl } from "../../model/pokebowl";

const ingredienten = [
    new Ingredient({
        id: 1,
        naam: 'Tofu',
        type: 'Protein',
        aantal: 50,
        prijs: 3.61
    }),
    new Ingredient({
        id: 2,
        naam: 'Avocado',
        type: 'Topping',
        aantal: 30,
        prijs: 2.78
    }),
    new Ingredient({
        id: 3,
        naam: 'Spicy mayo',
        type: 'Sauce',
        aantal: 200,
        prijs: 1.32
    }),
    new Ingredient({
        id: 4,
        naam: 'Cherry tomato',
        type: 'Topping',
        aantal: 74,
        prijs: 0.90
    }),
    new Ingredient({
        id: 5,
        naam: 'Red onion',
        type: 'Topping',
        aantal: 99,
        prijs: 0.32
    })
];

const singleIngredient = new Ingredient({
    id: 6,
    naam: 'Mango',
    type: 'Topping',
    aantal: 76,
    prijs: 2.16
});


test('given: valid values for pokebowl, when: pokebowl is created, then: pokebowl is created with those values', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl.getNaam()).toEqual(naam);
    expect(pokebowl.getType()).toEqual(type);
    expect(pokebowl.getBeschrijving()).toEqual(beschrijving);
    expect(pokebowl.getMaxAantalIngredienten()).toEqual(maxAantalIngredienten);
    expect(5).toEqual(pokebowl.getIngredienten().length);
});

test('given: valid ingredients for pokebowl, when: pokebowl is created, then: pokebowl is created with those ingredients', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl.getIngredienten()[0].getNaam()).toEqual(ingredienten[0].getNaam());
    expect(pokebowl.getIngredienten()[1].getNaam()).toEqual(ingredienten[1].getNaam());
    expect(pokebowl.getIngredienten()[2].getNaam()).toEqual(ingredienten[2].getNaam());
    expect(pokebowl.getIngredienten()[3].getNaam()).toEqual(ingredienten[3].getNaam());
    expect(pokebowl.getIngredienten()[4].getNaam()).toEqual(ingredienten[4].getNaam());
});

test('given: valid values for pokebowl, when: pokebowl is created, then: calculate the pokebowl price', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl.calculatePrice()).toEqual(13.93);
});

test('given: more ingredients than max, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 5;

    // when
    const pokebowl = () => {
        const newPokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });
        newPokebowl.addIngredient(singleIngredient);
    }

    // then
    expect(pokebowl).toThrow('Cannot add more ingredienten');
});


test('given: more ingredients than max aantal ingredient, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;
    singleIngredient.setIngredientLimit(1);

    // when
    const pokebowl = () => {
        const newPokebowl = new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });
        newPokebowl.addIngredient(singleIngredient);
        newPokebowl.addIngredient(singleIngredient);
    }

    // then
    expect(pokebowl).toThrow('Cannot add more Mango');
});



test('given: empty naam, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = () =>
        new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl).toThrow('Naam cannot be empty');
});


test('given: empty type, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = () =>
        new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl).toThrow('Type cannot be empty');
});



test('given: empty beschrijving, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "";
    const maxAantalIngredienten = 8;

    // when
    const pokebowl = () =>
        new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl).toThrow('Beschrijving cannot be empty');
});

test('given: empty max aantal ingredienten, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = NaN;

    // when
    const pokebowl = () =>
        new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl).toThrow('Max aantal ingredienten cannot be empty');
});

test('given: negative max ingredienten, when: pokebowl is created, then: an error is thrown', () => {
    // given
    const naam = "Tofu pokebowl";
    const type = "Tofu";
    const beschrijving = "Delicious tofu pokebowl with lots of toppings";
    const maxAantalIngredienten = -2;

    // when
    const pokebowl = () =>
        new Pokebowl({ naam, type, beschrijving, maxAantalIngredienten, ingredienten });

    // then
    expect(pokebowl).toThrow('Max aantal ingredienten must be a positive number');
});

