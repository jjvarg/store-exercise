import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext, useEffect, useState } from "react";

function CartProduct(props) {
  const [products, setProducts] = useState([]);
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  useEffect(() => {
    async function getProductData(id) {
      const response = await fetch("http://localhost:5000/products");
      const productsArray = await response.json();
      const productData = productsArray.find((product) => product.id === id);
      if (productData == undefined) {
        return undefined;
      }
      setProducts(productData);
    }
    getProductData(id);
  }, [props.id]);
  return (
    <>
      <h3>{products.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * products.price).toFixed(2)}</p>
      <Button
        variant="danger"
        size="sm"
        onClick={() => cart.deleteFromCart(id)}
      >
        Remove
      </Button>
      <hr></hr>
    </>
  );
}

export default CartProduct;
