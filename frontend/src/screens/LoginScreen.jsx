import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import { UserContext } from "../App";
const jwt = require("jsonwebtoken");

const LoginScreen = () => {
  //State for login data
  const [userData, setUserData] = useState({ email: "", password: "" });

  // name and id of the user
  const { setCurrentUser } = useContext(UserContext);
  const alert = useAlert();
  const history = useHistory();

  const location = useLocation();

  const emailHandler = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const passwordHandler = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const requestedData = await axios.post("/api/login", {
        email: userData.email,
        password: userData.password,
      });
      const token = requestedData.data;
      localStorage.setItem("token", token);
      const decoded = await jwt.decode(token);
      setCurrentUser({ id: decoded.id, name: decoded.name });
      localStorage.setItem("currentUser", JSON.stringify(decoded));

      if (location.pathname === "/login") history.push("/");
      if (location.pathname === "/cart") history.push("/checkout");
    } catch (error) {
      alert.show("email or password are incorrect");
    }
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col sm={12} md={10} lg={6} xl={6}>
          <Form>
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
              <Col xl={5}>
                <Button
                  onClick={submitHandler}
                  className="mx-auto"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>

              <Col xl={5} className="pt-2">
                <Link to="/register">Register</Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
