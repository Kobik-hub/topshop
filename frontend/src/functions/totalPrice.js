const totalPrice = (cart) => {
  let total = 0;
  cart.map((item) => {
    total += item.price * item.qty;
    return item;
  });
  return total.toFixed(2);
};

export default totalPrice;
