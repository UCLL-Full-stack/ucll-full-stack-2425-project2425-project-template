const getAllBookings = async () => {
    const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  };
  
  const getBookingById = (bookingId: string) => {
    const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
  }

  const createBooking = async (bookingData: { tripId: string; studentIds: number[]; bookingDate: Date; paymentStatus: string }, token: string) => {
    console.log(bookingData)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    });
};
  
  const BookingService = {
    getAllBookings,
    getBookingById,
    createBooking
  };
  
  export default BookingService;
  