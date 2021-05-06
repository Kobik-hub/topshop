import React, { useContext, useState } from "react";
import "react-step-progress/dist/index.css";
import { useAlert } from "react-alert";
import { ProgressBar, Button, Spinner } from "react-bootstrap";

//import components
import Shipping from "../components/Shipping";

//import  context
import { AddressContext } from "../App";

import Payment from "../components/Payment";
import ConfirmOrder from "../components/ConfirmOrder";

const CheckOutScreen = () => {
  const { shippingAddress } = useContext(AddressContext);

  //progress can be shipping => payment =>> place order
  const [progress, setProgress] = useState("shipping");
  const [progressBar, setProgressBar] = useState(30);

  const alert = useAlert();
  const onNextHandler = () => {
    switch (progress) {
      case "shipping": {
        if (shippingAddress.address.length < 1) {
          alert.show("Address is required filed");
          return;
        }
        if (shippingAddress.city.length < 1) {
          alert.show("City is required filed");
          return;
        }
        if (shippingAddress.postalCode.length < 1) {
          alert.show("Postal Code is required filed");
          return;
        }
        if (shippingAddress.country.length < 1) {
          alert.show("Country is required filed");
          return;
        }
        setProgress("payment");
        setProgressBar(60);
        break;
      }
      case "payment": {
        setProgress("place order");
        setProgressBar(100);
        break;
      }
      case "place order": {
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <ProgressBar className="mt-4 mb-5" animated now={progressBar} />
      {progress === "shipping" ? <Shipping /> : ""}
      {progress === "payment" ? <Payment /> : ""}
      <div className="text-center">
        {progress === "place order" ? (
          ""
        ) : (
          <Button
            onClick={onNextHandler}
            variant="dark"
            className="mt-5 rounded text-center"
          >
            <Spinner animation="border" size="sm" /> Next
          </Button>
        )}
        {progress === "place order" ? <ConfirmOrder /> : ""}
      </div>
    </>
  );
};

export default CheckOutScreen;
