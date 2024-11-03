import { Room } from '../model/Room';

const rooms = [
    new Room({
        id: 1,
        name: "Room 1",
        chairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
    }),

    new Room({
        id: 2,
        name: "Room 2",
        chairs: [1, 2, 3, 4, 5], 
    }),
];

const getAllRooms = (): Room[] => {
    return rooms;
};

const getRoomById = (id: number): Room | null => {
    const room = rooms.find((room) => room.getId() === id);
    return room || null;
}

export default {
    getAllRooms,
    getRoomById
};
