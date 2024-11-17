import { PrismaClient } from '@prisma/client';
import { Ticket } from '../model/Ticket';

const database = new PrismaClient();


const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const ticketsPrisma = await database.ticket.findMany({});
        return ticketsPrisma.map((ticketPrisma) => Ticket.from(ticketPrisma));
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


const getTicketById = async (id: number): Promise<Ticket | null> => {
    try {
        const ticketPrisma = await database.ticket.findUnique({
            where: { id },
        });
        return ticketPrisma ? Ticket.from(ticketPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


const addTicket = async (price: number, date: Date, time: Date, chair: number): Promise<Ticket> => {
    try {
        const ticketPrisma = await database.ticket.create({
            data: {
                price,
                date,
                time,
                chair,
            },
        });
        return Ticket.from(ticketPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

export default {
    getAllTickets,
    getTicketById,
    addTicket,
};
