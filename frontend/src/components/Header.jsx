import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const getUserName = () =>
    currentUser.name.length > 1 ? currentUser.name : "";
  const history = useHistory();

  // console.log(getUserName());

  const logoutHandler = () => {
    setCurrentUser({ id: "", name: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    history.push("/");
  };

  const ordersHandler = () => {
    setCurrentUser({ id: "", name: "" });
    history.push("/orders");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TopShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {/* Render user menu if CurrentUser exist 
               or
               Render Sign inbutton if !CurrentUser
               */}
              {currentUser.name ? (
                <NavDropdown
                  title={`${getUserName()}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={ordersHandler}>
                    Orders
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
