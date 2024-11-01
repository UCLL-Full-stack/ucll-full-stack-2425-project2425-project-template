import Head from "next/head";
// import Header if necessary
import { Product } from "@types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductService from "@services/ProductService";
import ProductInfo from "@components/productInfo";

const ReadProductById = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { productId } = router.query;

  const getProductById = async () => {
    try {
      const productResponse = await ProductService.getProductById(productId as string);
      const productData = await productResponse.json();
      setProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    if (productId) getProductById();
  }, [productId]);

  return (
    <>
      <Head>
        <title>Product Info</title>
      </Head>

      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Info about {product ? product.name : "loading..."}</h1>
        {!product && <p>Loading...</p>}
        <section>
          {product && <ProductInfo product={product} />}
        </section>
      </main>
    </>
  );
};

export default ReadProductById;
