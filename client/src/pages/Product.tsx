import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function getProductData(id) {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const productData = await response.json();
      setProduct(productData);
    }
    getProductData(id);
  },);

  return (
  // This is a temporary solution to display product data
    <>
    <div>
      <h1 align="center" className="p-3">
        {product.title}
      </h1>
      <p>
        {product.description}
      </p>
      <span>${product.price}</span>
    </div>
    </>
  );
}

export default Product;
