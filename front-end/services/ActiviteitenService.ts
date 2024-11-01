// ACTIVITEITEN GROEP 1
const getAllActiviteiten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/activiteit/groep%201', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

// ACTIVITEITEN GROEP 2
// const getAllActiviteiten = async () => {
//     return fetch(process.env.NEXT_PUBLIC_API_URL + '/activiteit/groep%202', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
// };

const ActiviteitenService = {
  getAllActiviteiten,
};

export default ActiviteitenService;