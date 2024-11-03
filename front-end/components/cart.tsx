import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
}

interface CartProps {
  items: Product[];
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({ items = [], totalPrice }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    <h3>Total Price: €{totalPrice.toFixed(2)}</h3>

    </div>
  );
};

export default Cart;