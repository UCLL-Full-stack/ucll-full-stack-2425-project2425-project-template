import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import ProductService from "@services/ProductService";
import { Product } from "@types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const ProductsOverview = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const image = "https://placehold.co/600x400";
  const router = useRouter(); // Initialize the useRouter hook

  const fetchProducts = async () => {
    try {
      const productResponse = await ProductService.getAllProducts();
      const productData = await productResponse.json();
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (productId: number) => {
    router.push(`/products/${productId}`); 
  };

  return (
    <>
      <Head>
        <title>Products Overview</title>
      </Head>

      <main className="d-flex flex-column align-items-center">
        <h1>Products</h1>

        <div className="d-flex gap-3 mb-4">
          <button className="btn btn-outline-secondary">Default</button>
          <button className="btn btn-outline-secondary">
            Price <span>&uarr;</span>
          </button>
          <button className="btn btn-outline-secondary">Reviews</button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="d-grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {products.map((product) => (
              <div
                key={product.id}
                className="card"
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => product.id !== undefined && handleCardClick(product.id)} 
              > 
              {/* // ask question in class not sure how to do this???? */}
                <img src={image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">€{product.price.toFixed(2)}</p>
                  <div className="d-flex align-items-center gap-1">
                    {[...Array(product.reviews.length)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={solidStar} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ProductsOverview;
