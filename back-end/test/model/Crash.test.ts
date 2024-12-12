import { Crash } from '../../model/Crash';

test('given: valid values for Crash, when: Crash is created, then: Crash is created with those values', () => {
    // given
    const type = 'Collision';
    const description = 'A severe crash';
    const casualties = 5;
    const deaths = 2;
    const id = 1;

    // when
    const crash = new Crash({ type, description, casualties, deaths, id });

    // then
    expect(crash.getType()).toBe(type);
    expect(crash.getDescription()).toBe(description);
    expect(crash.getCasualties()).toBe(casualties);
    expect(crash.getDeaths()).toBe(deaths);
    expect(crash.getId()).toBe(id);
});

test('given: missing type, when: Crash is created, then: an error is thrown', () => {
    // given
    const type = '';
    const description = 'A severe crash';
    const casualties = 5;
    const deaths = 2;
    const id = 1;

    // when / then
    expect(() => new Crash({ type, description, casualties, deaths, id })).toThrowError('Type is required');
});

test('given: missing description, when: Crash is created, then: an error is thrown', () => {
    // given
    const type = 'Collision';
    const description = '';
    const casualties = 5;
    const deaths = 2;
    const id = 1;

    // when / then
    expect(() => new Crash({ type, description, casualties, deaths, id })).toThrowError('Description is required');
});