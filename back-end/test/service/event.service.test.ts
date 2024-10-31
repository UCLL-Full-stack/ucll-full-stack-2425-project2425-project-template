import { set } from "date-fns";
import { Event } from "../../model/event";
import eventDb from "../../repository/event.db";
import { EventInput } from "../../types";
import eventService from "../../service/event.service";


let validEVentInput: EventInput;

const eventInput: EventInput = {
    id: 1,
        name: 'Conan gray concert.',
        description: 'This is connan gray his concert with songs from the new album.',
        date: new Date('2024-12-01'),
        location: 'Vorst National Brussel',
        category: 'Big-Event',
};

const event = new Event({
    ...eventInput
})

let createEventMock: jest.Mock;

beforeEach(() => {
    createEventMock = jest.fn();
});

afterEach(()=> {
    jest.clearAllMocks();
})


test('Given a valid event, when event is created, then event is created with those values', () => {
    // Given: Mock the createEvent function in eventDb
    eventDb.createEvent = createEventMock;

    // When: Call the eventService.createEvent function
    const createdEvent = eventService.createEvent({
        name: eventInput.name,
        description: eventInput.description,
        date: eventInput.date,
        location: eventInput.location,
        category: eventInput.category,
    });

    // Then: Verify that the event was created correctly
    expect(createEventMock).toHaveBeenCalledWith(expect.any(Event)); // Check that it was called with an Event instance
    expect(createEventMock).toHaveBeenCalledTimes(1); // Check that it was called exactly once

    // Check that the created event has the expected values
    expect(createEventMock).toHaveBeenCalledTimes(1);
    expect(createEventMock).toHaveBeenCalledWith(
        expect.objectContaining({
            name: eventInput.name,
            description: eventInput.description,
            date: eventInput.date,
            location: eventInput.location,
            category: eventInput.category,
        })
    );
});