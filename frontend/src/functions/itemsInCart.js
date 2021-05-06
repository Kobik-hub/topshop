const itemsInCart = (cart) => {
  let total = 0;
  cart.map((item) => {
    total += item.qty;
    return item;
  });
  return total;
};

export default itemsInCart;
