const getAllProducts=()=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
    
        }
      })}

const getProductById =(productId:string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
    
        }
      })

}

const ProductService={
    getProductById,
    getAllProducts
}
export default ProductService