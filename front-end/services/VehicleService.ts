const getAllVehicles = ()=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/vehicles',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const VehicleService = {
    getAllVehicles
}

export default VehicleService;