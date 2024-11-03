import axios from "axios";

import { FC } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
}

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: FC<ProductsTableProps> = ({ products }) => {
  const addToCart = (product: Product) => {
      axios.put(`http://localhost:3000/carts/1`, { productId: product.id })
        .then(response => alert(`${product.name} added to cart`))
        .catch(error => console.error("Error adding product to cart:", error));
    };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Rating</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.rating}</td>
            <td>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
