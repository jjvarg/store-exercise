import useForm from "../hooks/UseForm";
import { InputGroup, Card, Button, Form } from "react-bootstrap";

const FORM_ENDPOINT = "http://localhost:5000/products";

const ProductForm = () => {
  const { handleSubmit, status, message } = useForm({});

  if (status === "success") {
    return (
      <>
        <div className="text-2xl">Product added successfully!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="text-2xl">Something went wrong...</div>
        <div className="text-md">{message}</div>
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
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Stripe product ID"
                name="id"
                required
              />
              <hr></hr>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your new product"
                name="title"
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
                <InputGroup.Text>.00</InputGroup.Text>
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
