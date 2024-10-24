import { Bestelling } from "../model/bestelling";

test("given: valid values for bestelling, when: creating bestelling, then: bestelling is created", () => {
    const datum1 = new Date('2024-10-24')
    const bestelling = new Bestelling({ datum: datum1})

    expect(bestelling.getDatum()).toEqual(datum1);
})