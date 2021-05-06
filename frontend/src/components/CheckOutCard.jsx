import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { CartContext } from "../App";
import { UserContext } from "../App";

//import components
import LogInPopup from "./LogInPopup";

//import functions
import itemInCart from "../functions/itemsInCart";
import totalPrice from "../functions/totalPrice";
const CheckOutCard = () => {
  const { currentCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);

  const onCheckOutHandler = () => {
    if (currentUser.name.length < 1) setModalShow(true);
    else {
      history.push("/checkout");
    }
  };

  return (
    <>
      <Card
        bg="light"
        text="dark"
        style={{ width: "25rem" }}
        className="mb-2  h-10"
      >
        <Card.Body>
          <h3 className="pb-3">SubTotal ({itemInCart(currentCart)}) Items</h3>

          <p>{totalPrice(currentCart)}$</p>
          <hr />
          <Button
            disabled={!currentCart.length}
            onClick={onCheckOutHandler}
            block
          >
            Proceed To CheckOut
          </Button>
        </Card.Body>
      </Card>

      <LogInPopup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default CheckOutCard;
