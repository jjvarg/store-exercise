import { Button, Navbar, Modal } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function NavBarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productTotalCost, setProductsTotalCost] = useState(0);

  useEffect(() => {
    async function getProductTotal() {
      const totalCost = await cart.getTotalCost();
      setProductsTotalCost(totalCost);
    }
    getProductTotal();
    //console.log(productTotalCost)
  }, [cart, productTotalCost]);

  //Calculate total products in cart
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  //Bootstrap components used for simple/quick styling and functionality
  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">
          <img
            src="../src/assets/react.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Logo"
          />
          Palla Exercise Store
        </Navbar.Brand>
        <Button href="/add-product" variant="outline-primary">
          Add Product
        </Button>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={handleShow}>
            Cart ({productsCount} Items)
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}

              <h1>Total: ${productTotalCost}</h1>

              <Button variant="success" href="/checkout">
                Proceed to checkout
              </Button>
            </>
          ) : (
            <h3>There are no products in your cart.</h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBarComponent;
