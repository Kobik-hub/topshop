import React, { useContext } from "react";

import { CartContext } from "../App";
import { Row, Col, Image } from "react-bootstrap";
//import components

import CheckOutCard from "../components/CheckOutCard";
const CartScreen = () => {
  const { currentCart, setCurrentCart } = useContext(CartContext);

  const removeFromCartHandler = (productId) => {
    const updatedCart = currentCart.filter(
      (product) => product.id !== productId
    );
    setCurrentCart(updatedCart);

    if (updatedCart.length > 0)
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    else {
      localStorage.removeItem("cart");
    }
    // localStorage.setItem("cart", currentCart);
  };

  return (
    <div>
      <h1 className="pb-5">Shopping Cart</h1>

      <Row>
        <Col sm={10} xl={10}>
          <Row className="pb-5">
            <Col sm={2} xl={2}></Col>
            <Col sm={2} xl={2}>
              Name
            </Col>
            <Col sm={2} xl={2}>
              Price
            </Col>
            <Col sm={2} xl={2}>
              Qty
            </Col>
          </Row>

          {currentCart.length > 0
            ? currentCart.map((product) => (
                <div key={product.id}>
                  <hr />
                  <Row key={product.name}>
                    <Col sm={2} xl={2}>
                      <Image src={`${product.image}`} fluid />
                    </Col>
                    <Col sm={2} xl={2}>
                      {product.name}
                    </Col>
                    <Col sm={2} xl={2}>
                      {product.price}
                    </Col>
                    <Col sm={2} xl={2}>
                      {product.qty}
                    </Col>
                    <Col sm={2} xl={2}>
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromCartHandler(product.id)}
                        className="fa fa-trash"
                        aria-hidden="true"
                      ></i>
                    </Col>
                  </Row>{" "}
                </div>
              ))
            : ""}
        </Col>
        <Col className="pt-5" sm={4} xl={2}>
          <CheckOutCard />
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
