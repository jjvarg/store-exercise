import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function Checkout() {
 const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
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
//Checkout and send cart to backend as JSON data
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

/*
//This is where I will pull the cart data from local storage, and display in DOM as separate line items, showing the total cost.


    const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cartProducts") ?? "[]"
      );
*/
  return (
/*
    {cartFromLocalStorage && cartFromLocalStorage.map((product, idx) => (

       // map through array here

    ))}
    
      // and render a button to finalize the checkout process which will post an array to the "orders" api endpoint
*/
    <>
    <div>This is where I will pull the cart data from local storage, and display as separate line items, showing the total cost.</div>
    <Button variant="success" href="/checkout" onClick={checkout}>Submit Payment</Button>
    </>
  )
}

export default Checkout