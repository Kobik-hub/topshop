// import React from "react";
// import {
//   DropdownButton,
//   Dropdown,
//   ListGroupItem,
//   Row,
//   Col,
// } from "react-bootstrap";
// const DropDownQty = () => {
//   //render max 5 drop item
//   const qtyOptions =
//     countInStock > 5 ? [...Array(5).keys()] : [...Array(countInStock).keys()];

//   const qtyHandler = (e) => {
//     // const newQty = parseInt(e.target.innerText);
//     SetCurrentQty(newQty);
//   };

//   return (
//     <ListGroupItem>
//       <Col>Qty</Col>
//       <Col>
//         <Form onSubmit={(e) => addToCartHandler(product, cart, alert, e)}>
//           <Form.Control
//             as="select"
//             className="mr-sm-2"
//             id="inlineFormCustomSelect"
//             custom
//           >
//             <option value="0">Choose...</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//           </Form.Control>

//           <Button
//             className="btn-block"
//             disabled={product.countInStock === 0}
//             type="submit"
//           >
//             Add to cart
//           </Button>
//         </Form>
//       </Col>
//     </ListGroupItem>
//   );
// };

// export default DropDownQty;
