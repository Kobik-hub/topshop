import React, { useContext } from "react";

import { AddressContext } from "../App";

import { FormControl, Row, Col } from "react-bootstrap";

const Shipping = () => {
  const { shippingAddress, setShippingAddress } = useContext(AddressContext);
  const addressHandler = (e) => {
    setShippingAddress({ ...shippingAddress, address: e.target.value });
  };

  const cityHandler = (e) => {
    setShippingAddress({ ...shippingAddress, city: e.target.value });
  };

  const postalCodeHandler = (e) => {
    setShippingAddress({ ...shippingAddress, postalCode: e.target.value });
  };

  const countryHandler = (e) => {
    setShippingAddress({ ...shippingAddress, country: e.target.value });
  };

  return (
    <>
      <p className="h1 mb-4">Shipping Address</p>

      <Row className="justify-content-center">
        <Col xl={6}>
          <Row>
            <Col xl={2}>
              <p>Address:</p>
            </Col>
            <Col>
              <FormControl
                onChange={addressHandler}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xl={2}>
              <p>City:</p>
            </Col>
            <Col>
              <FormControl
                onChange={cityHandler}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xl={2}>
              <p>Postal Code:</p>
            </Col>
            <Col>
              <FormControl
                onChange={postalCodeHandler}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xl={2}>
              <p>Country:</p>
            </Col>
            <Col>
              <FormControl
                onChange={countryHandler}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Shipping;
