const express = require("express");
const router = express.Router();
const db = require("../config/database");

const getCartItems = db.prepare(`
  SELECT
    ci.id AS cart_item_id,
    ci.product_id,
    ci.variant_id,
    ci.quantity,
    v.price,
    p.name
  FROM cart_items ci
  JOIN variants v ON ci.variant_id = v.id
  JOIN products p ON ci.product_id = p.id
  WHERE ci.user_id = ?
`);

const createOrder = db.prepare(`
  INSERT INTO orders (user_id, total)
  VALUES (?, ?)
`);

const createOrderItem = db.prepare(`
  INSERT INTO order_items (
    order_id,
    product_id,
    variant_id,
    quantity,
    price
  )
  VALUES (?, ?, ?, ?, ?)
`);

const clearCart = db.prepare(`
  DELETE FROM cart_items
  WHERE user_id = ?
`);

const completeOrder = db.transaction((userId, cartItems, total) => {
  const orderResult = createOrder.run(userId, total);
  const orderId = orderResult.lastInsertRowid;

  for (const item of cartItems) {
    createOrderItem.run(
      orderId,
      item.product_id,
      item.variant_id,
      item.quantity,
      item.price
    );
  }

  clearCart.run(userId);

  return orderId;
});

router.get("/", (req, res) => {
  res.json({ message: "Orders route is working!" });
});

router.post("/", (req, res) => {
  try {
const userId = 1;
const cartItems = getCartItems.all(userId);

if (cartItems.length === 0) {
  return res.status(400).json({
    error: "Your cart is empty"
  });
}

const total = cartItems.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

const orderId = completeOrder(userId, cartItems, total);

res.json({
  message: "Order created!",
  orderId,
  total,
  cartItems
});
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Could not create order" });
  }
});

module.exports = router;