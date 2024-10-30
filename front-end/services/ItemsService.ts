

const getAllItems = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

};


const ItemsService = { getAllItems, };




export default ItemsService;
