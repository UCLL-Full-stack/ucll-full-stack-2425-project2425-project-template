import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/carts';

class ProductService {
    async addProductToCart(productId: string) {
        const response = await axios.put(API_URL, { productId }, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
        return response.data;
    }
}

export default new ProductService();
