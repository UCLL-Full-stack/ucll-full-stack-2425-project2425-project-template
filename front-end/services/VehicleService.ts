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

const VehicleService = {
    getAllVehicles,
    addVehicle
}

export default VehicleService;