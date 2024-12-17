import { get } from 'http';
import {Ticket} from '../model/ticket';
import ticketDb from '../repository/ticket.db';
import { EventInput, UserInput } from '../types';

const getAllTickets = async (): Promise<Ticket[]> => {
    return await ticketDb.getAllTickets();
};

const getTicketsByEventId = async (eventId: number): Promise<Ticket[]> => {
    return await ticketDb.getTicketsByEventId(eventId);
};

const getTicketsByUserEmail = async (email: string): Promise<Ticket[]> => {
    return await ticketDb.getTicketsByUserEmail(email);
};

const userBuyTicket = async (ticketId: number, email: string) => {
    return await ticketDb.userBuyTicket(ticketId, email);
};

const removeUserFromTicket = async (ticketId: string) => {
    return await ticketDb.removeUserFromTicket(ticketId);
}

const createTicket = async (type: string, cost: number, event: EventInput) => {
    return await ticketDb.createTicket(type, cost, event);
}

export default {
    getAllTickets,
    getTicketsByEventId,
    userBuyTicket,
    getTicketsByUserEmail,
    removeUserFromTicket,
    createTicket,
};