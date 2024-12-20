import { Event } from '../../model/event';

describe('Event Model', () => {
    const validEventData = {
        id: 1,
        name: 'Sample Event',
        description: 'This is a sample event description.',
        date: new Date('2025-12-17'),
        location: 'New York',
        category: 'Technology',
        backgroundImage: '/images/sample-event.jpg',
        isTrending: true,
    };

    describe('Happy Path', () => {
        it('should create an Event instance with valid data', () => {
            const event = new Event(validEventData);
            expect(event.getId()).toBe(validEventData.id);
            expect(event.getName()).toBe(validEventData.name);
            expect(event.getDescription()).toBe(validEventData.description);
            expect(event.getDate()).toEqual(validEventData.date);
            expect(event.getLocation()).toBe(validEventData.location);
            expect(event.getCategory()).toBe(validEventData.category);
            expect(event.getBackgroundImage()).toBe(validEventData.backgroundImage);
            expect(event.getIsTrending()).toBe(validEventData.isTrending);
        });

        it('should correctly compare two equal Event instances', () => {
            const event1 = new Event(validEventData);
            const event2 = new Event(validEventData);
            expect(event1.equals(event2)).toBe(true);
        });
    });

    describe('Unhappy Path', () => {
        it('should throw an error if the name is empty', () => {
            expect(() => {
                new Event({ ...validEventData, name: '' });
            }).toThrow('Name cannot be empty');
        });

        it('should throw an error if the description is empty', () => {
            expect(() => {
                new Event({ ...validEventData, description: '' });
            }).toThrow('Description cannot be empty');
        });

        it('should throw an error if the date is invalid', () => {
            expect(() => {
                new Event({ ...validEventData, date: new Date('invalid-date') });
            }).toThrow('Date is invalid');
        });

        it('should throw an error if the location is empty', () => {
            expect(() => {
                new Event({ ...validEventData, location: '' });
            }).toThrow('Location cannot be empty');
        });

        it('should throw an error if the category is empty', () => {
            expect(() => {
                new Event({ ...validEventData, category: '' });
            }).toThrow('Category cannot be empty');
        });

        it('should throw an error if the event ID is missing when calling getId', () => {
            const event = new Event({ ...validEventData, id: undefined });
            expect(() => {
                event.getId();
            }).toThrow('The event needs to have an ID.');
        });

        it('should correctly compare two different Event instances', () => {
            const event1 = new Event(validEventData);
            const event2 = new Event({ ...validEventData, name: 'Different Event' });
            expect(event1.equals(event2)).toBe(false);
        });
    });
});