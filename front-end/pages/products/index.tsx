import Head from "next/head";
import ProductsOverview from "@components/product/productsOverview";
import Header from "@components/header";

const ProductIndexPage = () => {
  return (
    <>
    <Header />
      <Head>
        <title>Product List</title>
      </Head>

      <main className="d-flex flex-column align-items-center">
        <h1>Our Products</h1>
        <ProductsOverview />
      </main>
    </>
  );
};

export default ProductIndexPage;
