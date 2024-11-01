import { set } from 'date-fns';
import { User } from '../../model/user';
import { SpeedrunEvent } from '../../model/speedrun_event';

const name: string = 'SGDR 2024';
const startDate: Date = set(new Date(), { date: 22, month: 11, year: 2024 });
const endDate: Date = set(new Date(), { date: 24, month: 11, year: 2024 });
const participants: Array<User> = [];

test(`given: valid values for speedrunEvent, when: speedrunEvent is created, then: speedrunEvent is created with those values`, () => {
    // given

    // when
    const speedrunEvent = new SpeedrunEvent({
        name,
        startDate,
        endDate,
        participants,
    });
    // then
    expect(speedrunEvent.getName()).toEqual(name);
    expect(speedrunEvent.getStartDate()).toEqual(startDate);
    expect(speedrunEvent.getEndDate()).toEqual(endDate);
    expect(speedrunEvent.getParticipants()).toEqual(participants);
});
