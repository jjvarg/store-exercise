import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import NavBarComponent from "./components/NavBar";
import CartProvider from "./CartContext";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product"

function App() {
  return (
    <CartProvider>
      <Container>
        <NavBarComponent></NavBarComponent>
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />}></Route>
            <Route path="add-product" element={<AddProduct />}></Route>
            <Route path="success" element={<Success />}></Route>
            <Route path="cancel" element={<Cancel />}></Route>
            <Route path="products/:id" element={<Product />}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
