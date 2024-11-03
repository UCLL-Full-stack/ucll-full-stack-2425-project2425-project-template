import axios from 'axios';

const API_URL = 'http://localhost:3000/carts/1';

class ProductService {
    async addProductToCart(productId: string) {
        const response = await axios.put(API_URL, {productId});
        return response.data;
    }
}

export default new ProductService();
