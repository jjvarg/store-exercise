import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  //console.log(cart.items);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <hr></hr>
        <Card.Img src="./src/assets/200.svg" />
        <Card.Body><Button variant ="outline-primary" href={`/products/${product.id}`}>More details</Button></Card.Body>
        <hr></hr>
        <Card.Text>${parseFloat(product.price).toFixed(2)}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm="6">
                <Button
                  variant="outline-success"
                  sm="6"
                  onClick={() => cart.addOneToCart(product.id)}
                  className="mx-2"
                >
                  +
                </Button>
                <Button
                  variant="outline-danger"
                  sm="6"
                  onClick={() => cart.removeOneFromCart(product.id)}
                  className="mx-2"
                >
                  -
                </Button>
              </Col>
            </Form>
            <hr></hr>
            <Button
              variant="danger"
              onClick={() => cart.deleteFromCart(product.id)}
            >
              Remove From Cart
            </Button>
          </>
        ) : (
          <Button
            variant="outline-success"
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
