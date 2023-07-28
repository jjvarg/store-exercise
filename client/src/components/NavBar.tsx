import { Button, Navbar, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function NavBarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Checkout via stripe and send cart to backend as JSON data
  const checkout = async () => {
    await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        //Retrieve response from backend and process to JSON
        return response.json();
      })
      .then((response) => {
        //Retrieve URL from JSON and redirecting the user to Stripe
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

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

              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Proceed to checkout
              </Button>
            </>
          ) : (
            <h1>There are no products in your cart.</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBarComponent;
