import useForm from "../hooks/UseForm";
import { InputGroup, Card, Button, Form } from "react-bootstrap";

const FORM_ENDPOINT = "http://localhost:5000/products";

const ProductForm = () => {
  const { handleSubmit, status, message } = useForm({});

  if (status === "success") {
    return (
      <>
        <h1 align="center">Product added successfully!</h1>
        <Button href="/add-product">Add another product</Button>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <h1 align="center">Something went wrong...</h1>
        <span align="center">{message}</span>
      </>
    );
  }

  return (
    <>
      <h1 align="center">Add a new product</h1>
      <Card>
        <Card.Body>
          <Form action={FORM_ENDPOINT} onSubmit={handleSubmit} method="POST">
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your new product"
                name="title"
                required
              />
              <hr></hr>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description of the product"
                name="description"
                required
              />
              <hr></hr>
              <Form.Label>Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                  placeholder="Price in USD"
                  name="price"
                  required
                />
              </InputGroup>
              <hr></hr>
              {status !== "loading" && (
                <Button className="primary" type="submit">
                  Add this product
                </Button>
              )}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductForm;
