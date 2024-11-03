
const getAllRooms = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  

  const getRoomById = async (roomId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  


  
  const RoomService = {
    getAllRooms,
    getRoomById
  };
  
  export default RoomService;
  