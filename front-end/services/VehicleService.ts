import { Vehicle } from "@/types";

const getAllVehicles = ()=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/vehicles',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const addVehicle = (vehicle: any)=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/vehicles',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicle)
    })
}

const deleteVehicle = (vehicleId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${vehicleId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const editVehicle = (vehicleId: number, input: Vehicle)=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/vehicles/${vehicleId}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
}

const VehicleService = {
    getAllVehicles,
    addVehicle,
    deleteVehicle,
    editVehicle
}

export default VehicleService;