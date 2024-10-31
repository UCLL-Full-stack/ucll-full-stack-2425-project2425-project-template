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