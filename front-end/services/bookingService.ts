const getAllBookings = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  };
  
  const getBookingById = (bookingId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  const BookingService = {
    getAllBookings,
    getBookingById
  };
  
  export default BookingService;
  