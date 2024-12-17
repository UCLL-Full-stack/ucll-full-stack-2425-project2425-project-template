import { PrismaClient } from '@prisma/client';
import { Room } from '../model/Room';

const database = new PrismaClient();


const getAllRooms = async (): Promise<Room[]> => {
    try {
        const roomsPrisma = await database.room.findMany({});
        return roomsPrisma.map((roomPrisma) => Room.from(roomPrisma));
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


const getRoomById = async (id: number): Promise<Room | null> => {
    try {
        const roomPrisma = await database.room.findUnique({
            where: { id },
        });
        return roomPrisma ? Room.from(roomPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


const addRoom = async (name: string, chairs: number[]): Promise<Room> => {
    try {
        const roomPrisma = await database.room.create({
            data: {
                name,
                chairs,
            },
        });
        return Room.from(roomPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

export default {
    getAllRooms,
    getRoomById,
    addRoom,
};
