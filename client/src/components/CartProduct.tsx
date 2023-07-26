import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../ProductStore";

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);
  console.log(productData);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
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
