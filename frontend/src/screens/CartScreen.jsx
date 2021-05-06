import React, { useContext } from "react";

import { CartContext } from "../App";
import { Row, Col, Image } from "react-bootstrap";
//import components

import CheckOutCard from "../components/CheckOutCard";
const CartScreen = () => {
  const { currentCart } = useContext(CartContext);
  return (
    <div>
      <h1 className="pb-5">Shopping Cart</h1>

      <Row>
        <Col xl={10}>
          <Row className="pb-5">
            <Col xl={2}></Col>
            <Col xl={2}>Name</Col>
            <Col xl={2}>Price</Col>
            <Col xl={2}>Qty</Col>
          </Row>

          {currentCart.length > 0
            ? currentCart.map((product) => (
                <div key={product.id}>
                  <hr />
                  <Row key={product.name}>
                    <Col xl={2}>
                      <Image src={`${product.image}`} fluid />
                    </Col>
                    <Col xl={2}>{product.name}</Col>
                    <Col xl={2}>{product.price}</Col>
                    <Col xl={2}>{product.qty}</Col>
                    <Col xl={2}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </Col>
                  </Row>{" "}
                </div>
              ))
            : ""}
        </Col>
        <Col xl={2}>
          <CheckOutCard />
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
