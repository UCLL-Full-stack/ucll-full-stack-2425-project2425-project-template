import { Event } from '../../model/event';

// Sample data for the event
const name = 'Taylor Swift concert';
const description = 'Amazing music, sung by a talented artist.';
const date = new Date('2024-12-12');
const location = 'Amsterdam';
const category = 'Big-Event';



//Tests
test('Given: valid values for event, when: event is created, then: event is created with those values', () => {
    // Given
    const event = new Event({ name, description, date, location, category });

    // When
    const createdEvent = event;

    // Then
    expect(createdEvent.getName()).toEqual(name);
    expect(createdEvent.getDescription()).toEqual(description);
    expect(createdEvent.getDate()).toEqual(date);
    expect(createdEvent.getLocation()).toEqual(location);
    expect(createdEvent.getCategory()).toEqual(category);
});

test('given: invalid date, when: event is created, then: an error is thrown', () => {
    // given
    const invalidEndDate = new Date('Invalid-date-string');

    // when
    const newEvent = () => {
        new Event({ name, description, date: invalidEndDate, location, category })
    };


    // then
    expect(newEvent).toThrow('Date is invalid');

});

test('Given: event with an id, when: getId is called, then: returns the event with the correct id.,', () => {
    //given:
    const id = 1;
    const event = new Event({ id, name, description, date, location, category });

    //Then:
    expect(event.getId()).toEqual(id);
});

test('Given: event with no id, when: wanting to call event with getId, then: error is thrown.', ()=>{
    // Given
    const event = new Event({ name, description, date, location, category });

    // When
    const getId = () => event.getId();

    // Then
    expect(getId).toThrow('The event needs to have an ID.');
});

test('Given: event with empty name, When: event is created, Then: an error is thrown', () => {
    // Given
    const emptyName = '';
    
    // When
    const createEvent = () => {
        new Event({ name: emptyName, description, date, location, category });
    };

    // Then
    expect(createEvent).toThrow('Name cannot be empty');
});

test('Given: event with empty description, When: event is created, Then: an error is thrown', () => {
    // Given
    const emptyDescription = '';
    
    // When
    const createEvent = () => {
        new Event({ name, description: emptyDescription, date, location, category });
    };

    // Then
    expect(createEvent).toThrow('Description cannot be empty');
});

test('Given: event with empty location, When: event is created, Then: an error is thrown', () => {
    // Given
    const emptyLocation = '';
    
    // When
    const createEvent = () => {
        new Event({ name, description, date, location: emptyLocation, category });
    };

    // Then
    expect(createEvent).toThrow('Location cannot be empty');
});

test('Given: event with empty category, When: event is created, Then: an error is thrown', () => {
    // Given
    const emptyCategory = '';
    
    // When
    const createEvent = () => {
        new Event({ name, description, date, location, category: emptyCategory });
    };

    // Then
    expect(createEvent).toThrow('Category cannot be empty');
});