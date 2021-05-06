const addToCartHandler = (product, cart, alert, e) => {
  e.preventDefault();

  const enteredQty = e.target[0].options.selectedIndex;
  if (enteredQty === 0) {
    alert.show("choose qty");
    return;
  }
  const currentCart = cart.currentCart;
  for (let i = 0; i < currentCart.length; i++) {
    if (currentCart[i].name === product.name) {
      alert.show("Item already in cart");
      return;
    }
  }
  const item = {
    id: product._id,
    name: product.name,
    qty: enteredQty,
    image: product.image,
    price: product.price,
    product: product,
  };
  cart.setCurrentCart([...currentCart, item]);
  console.log(cart);
  alert.show("New item added to your shopping cart");
};

export default addToCartHandler;
