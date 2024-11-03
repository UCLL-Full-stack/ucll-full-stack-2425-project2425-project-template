import Head from "next/head";
import ProductsTable from "@/components/products/ProductsTable";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <main>
        <h1>Products</h1>
        <ProductsTable products={products} />
      </main>
    </>
  );
};

export default ProductsPage;
