/*
let productsArray = [
  {
    id: "price_1NWKNaB851ugm4QdDSLxaufG",
    title: "Test Product #1",
    price: 10.0,
  },
  {
    id: "price_1NWKOgB851ugm4Qd39OXxmdU",
    title: "Test Product #2",
    price: 1.0,
  },
];
*/

async function getProductData(id: string) {
  let productsArray = await fetch("http://localhost:5000/products").then(
    (res) => res.json()
  );
  let productData = productsArray.find((product) => product.id === id);

  if (productData == undefined) {
    return undefined;
  }

  return productData;
}

export { getProductData };
