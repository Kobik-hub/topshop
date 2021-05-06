import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
const OrdersScreen = ({ math }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const localData = localStorage.getItem("currentUser");

      if (localData && orders.length < 1) {
        const user = JSON.parse(localData);
        const { data } = await axios.get(`/api/orders/${user.id}`);
        setOrders(data);
        // console.log(data);
      }
    };
    fetchOrders();
  }, [orders]);

  return (
    <>
      {orders.length > 1 ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}$</td>
                <th>
                  <Button variant="primary">Details</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        ""
      )}
    </>
  );
};

export default OrdersScreen;
