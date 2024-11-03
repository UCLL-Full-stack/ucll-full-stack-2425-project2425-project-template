import { Ticket } from '../model/Ticket';

const tickets = [
    new Ticket({
        id: 1,
        price: 12.5,
        date: new Date('2024-11-01'),
        time: new Date('2024-11-01T19:00:00'), 
        chair: 5, 
    }),
    
    new Ticket({
        id: 2,
        price: 15.0,
        date: new Date('2024-11-02'),
        time: new Date('2024-11-02T21:00:00'),
        chair: 12,
    }),
];

const getAllTickets = (): Ticket[] => {
    return tickets;
};

const getTicketById = (id: number): Ticket | null => {
    const ticket = tickets.find((ticket) => ticket.getId() === id);
    return ticket || null;
}

export default {
    getAllTickets,
    getTicketById
};
