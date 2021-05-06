import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import { UserContext } from "../App";
const jwt = require("jsonwebtoken");

const RegisterScreen = ({ history }) => {
  //State for login data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Name and Id of the user
  const { setCurrentUser } = useContext(UserContext);
  const alert = useAlert();

  const nameHandler = (e) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const emailHandler = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const passwordHandler = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      const requestedData = await axios.post("/api/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      const token = requestedData.data;
      localStorage.setItem("token", token);
      const decoded = await jwt.decode(token);
      setCurrentUser({ id: decoded.id, name: decoded.name });
      history.push("/");
    } catch (error) {
      alert.show(error.message);
    }
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col sm={12} md={10} lg={6} xl={6}>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={nameHandler}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={emailHandler}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={passwordHandler}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Row className="justify-content-center">
              <Col xl={5} className="pt-2">
                <Button onClick={submitHandler} variant="primary">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
