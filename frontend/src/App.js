import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import jwt from "jsonwebtoken";
import OrdersScreen from "./screens/OrdersScreen";

//Context hook

export const UserContext = React.createContext(null);
export const CartContext = React.createContext(null);
export const AddressContext = React.createContext(null);

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
  });
  const [currentCart, setCurrentCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  if (localStorage.getItem("token") && currentUser.id.length < 1) {
    const token = localStorage.getItem("token");
    const { id, name } = jwt.decode(token);
    setCurrentUser({ id: id, name: name });
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CartContext.Provider value={{ currentCart, setCurrentCart }}>
        <AddressContext.Provider
          value={{ shippingAddress, setShippingAddress }}
        >
          <BrowserRouter>
            <Header />
            <main className="py-3">
              <Container>
                <Switch>
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/login" component={LoginScreen} />
                  <Route path="/register" component={RegisterScreen} />
                  <Route path="/cart" component={CartScreen} />
                  <Route path="/checkout" component={CheckOutScreen} />
                  <Route path="/orders" component={OrdersScreen} />
                  <Route path="/" component={HomeScreen} />
                </Switch>
              </Container>
            </main>
            <Footer />
          </BrowserRouter>
        </AddressContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
