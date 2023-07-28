import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Col, Row } from "react-bootstrap";
import { useFetch } from "../hooks/UseFetch";

function Store() {
  const [url] = useState("http://localhost:5000/products");
  const { data, isPending, error } = useFetch(url);

  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the Palla Exercise Store
      </h1>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Row xs={1} md={3} className="g-4">
        {data &&
          data.map((product, idx) => (
            <Col align="center" key={idx}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Store;
