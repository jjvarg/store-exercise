import { createContext, useEffect, useState } from "react";

async function getProductData(id: string) {
  const response = await fetch("http://localhost:5000/products");
  const productsArray = await response.json();
  //console.log(productsArray);
  const productData = productsArray.find((product) => product.id === id);
  if (productData == undefined) {
    return undefined;
  }
  //console.log(productData);
  return productData;
}

export { getProductData };

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

//Retrieve cart from local storage, if cart doesn't exist, fallback and create an empty array
const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartProducts") ?? "[]"
);

export function CartProvider({ children }) {
  //Set default state to retrieve cart from local storage on app load
  const [cartProducts, setCartProducts] = useState(cartFromLocalStorage);

  useEffect(() => {
    //Store cart in local storage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      //The product doesn't exist in the cart, add product by id and set quantity to 1
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      //The product is in the cart, match product by id and increase quantity by 1
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      //Only one quantity of the product exists, remove the product completel
      deleteFromCart(id);
    } else {
      //If quantity is greater than 1, decrease quantity by 1
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }
  function deleteFromCart(id) {
    //Remove the product by id
    setCartProducts((cartProducts) => {
      return cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      });
    });
  }

  function getTotalCost() {
    //Simple math for cart/checkout total
    let totalCost = 0;
    cartProducts.map(async (cartItem) => {
      const productData = await getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
