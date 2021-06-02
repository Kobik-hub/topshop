import React, { useContext } from "react";

import { AddressContext } from "../App";
import { CartContext } from "../App";
import { UserContext } from "../App";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
//import functions
import itemInCart from "../functions/itemsInCart";
import totalPrice from "../functions/totalPrice";
import ConfirmPopup from "./ConfirmPopup";

const ConfirmOrder = () => {
  const { currentUser } = useContext(UserContext);
  const { currentCart, setCurrentCart } = useContext(CartContext);
  const { shippingAddress } = useContext(AddressContext);

  //self state for order success popup and order id
  const [confirmPop, setConfirmPop] = React.useState({
    active: false,
    orderId: "",
  });
  //
  const history = useHistory();

  const onConfirmOrder = async () => {
    try {
      const requestedData = await axios.post("/api/orders", {
        user: currentUser,
        orderItems: currentCart,
        shippingAddress: shippingAddress,
        totalPrice: totalPrice(currentCart),
      });
      setConfirmPop({ orderId: requestedData.data, active: true });
      localStorage.setItem("cart", []);
    } catch (error) {
      //   alert.show("email or password are incorrect");
      console.log(error.message);
    }
  };

  return (
    <div>
      <Row>
        <Col xl={8}>
          <Row>
            <h3>Shipping</h3>

            <hr style={{ color: "red" }} />
          </Row>
          <Row>
            <p>
              Address: {shippingAddress.address}, {shippingAddress.country}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </Row>
          <hr />

          <Row>
            <h3>Order Items</h3>

            <hr />
          </Row>
          {currentCart.map((product) => {
            return (
              <div key={product.id}>
                <Row>
                  <Col xl={2}>
                    <Image src={`${product.image}`} fluid />
                  </Col>
                  <Col xl={6}>{product.name}</Col>
                  <Col xl={4}>
                    {product.qty} x {product.price} ={" "}
                    {product.qty * product.price}$
                  </Col>
                </Row>
                <hr />
              </div>
            );
          })}
        </Col>
        <Col xl={4}>
          <Card
            bg="light"
            text="dark"
            style={{ width: "20rem" }}
            className="mb-2  h-10"
          >
            <Card.Body>
              <h3 className="pb-3">Order Summary</h3>
              <p className="h5">Total Items: {itemInCart(currentCart)}</p>
              <hr />
              <p className="h5">Total Price: {totalPrice(currentCart)}$</p>
              <hr />

              <Button
                disabled={!currentCart.length}
                onClick={onConfirmOrder}
                block
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ConfirmPopup
        history={history}
        orderId={confirmPop.orderId}
        userName={currentUser.name}
        show={confirmPop.active}
        onHide={() => setConfirmPop({ ...confirmPop, active: false })}
        clearCart={() => setCurrentCart([])}
      />
    </div>
  );
};

export default ConfirmOrder;
