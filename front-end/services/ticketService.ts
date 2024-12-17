
const getAllTickets = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  
  const getTicketById = async (ticketId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticketId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
 
  

  
  const TicketService = {
    getAllTickets,
    getTicketById
  };
  
  export default TicketService;
  