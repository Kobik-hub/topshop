import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";

//import components
import Rating from "../components/Rating";

//import functions
import addToCartHandler from "../functions/addToCartHandler";

//import Context
import { CartContext } from "../App";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  const cart = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = match.params.id;
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);
  const alert = useAlert();

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>{product.name}</h4>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Col>Qty</Col>
                  <Col>
                    <Form
                      onSubmit={(e) =>
                        addToCartHandler(product, cart, alert, e)
                      }
                    >
                      <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                      >
                        <option value="0">Choose...</option>
                        <option value="1">1</option>
                        <option disabled={product.countInStock < 2} value="2">
                          2
                        </option>
                        <option disabled={product.countInStock < 3} value="3">
                          3
                        </option>
                        <option disabled={product.countInStock < 4} value="4">
                          4
                        </option>
                        <option disabled={product.countInStock < 5} value="5">
                          5
                        </option>
                      </Form.Control>

                      <Button
                        className="btn-block"
                        disabled={product.countInStock === 0}
                        type="submit"
                      >
                        Add to cart
                      </Button>
                    </Form>
                  </Col>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
