import ProductService from '@/services/ProductService';
import { productInput, reviewsInput } from '@/types';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import axios from "axios";
import React, { useEffect, useState } from 'react'

const ReadLecturerById = () => {

    const [product,setProduct] = useState<productInput>();
    const router = useRouter()
    const {productId} = router.query;

    const getProductById = async() => {
        const productResponse = await ProductService.getProductById(productId as string);
        const product = await productResponse.json();
        setProduct(product);
    }

    useEffect(() => {
        if(productId){
            getProductById();
        }
    },[productId])

    const addToCart = (product: productInput) => {
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/carts`, { productId: product.id }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
      })
        .then(response => alert(`${product.name} added to cart`))
        .catch(error => console.error("Error adding product to cart:", error));
    };
    

  return (
      <>
      {product && (
        <main>
          <h2>PRODUCT</h2>
<table>
  <tbody>
    <tr>
      <td>Name:</td>
      <td>{product.name}</td>
    </tr>
    <tr>
      <td>Price:</td>
      <td>{product.price}</td>
    </tr>
    <tr>
      <td>Description:</td>
      <td>{product.description}</td>
    </tr>
    <tr>
      <td>Rating:</td>
      <td>{product.rating}</td>
    </tr>
  </tbody>
</table>
{sessionStorage.getItem('authToken')?
<button onClick={() => addToCart(product)}>Add to Cart</button> : null
}


      <h2>REVIEWS</h2>
        <table>
      <thead>
        <tr>
          <th>Rating</th>
          <th>Text</th>
          <th>Created at:</th>
        </tr>
      </thead>
      <tbody>
        {product.reviews ?  product.reviews.map(review => (
          <tr key={review.id}>
            <td>{review.rating}</td>
            <td>{review.text}</td>
            <td>{review.createdAt}</td>
            {/* <td>{review.user.name}</td> */}
          </tr>
        )) : null}
      </tbody>
    </table>
        </main>
    )}
    </>
  )
}

export default ReadLecturerById