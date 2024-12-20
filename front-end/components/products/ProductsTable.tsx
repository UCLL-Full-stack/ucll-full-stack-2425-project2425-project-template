import Link from "next/link";
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
            <Link href={`/products/${product.id}`}>  <button>Click for more info</button></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
