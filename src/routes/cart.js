const express = require("express");
const router = express.Router();
const db = require("../config/database");

const getVariantById = db.prepare(`
  SELECT v.id, v.product_id, v.price, v.stock, p.name
  FROM variants v
  JOIN products p ON v.product_id = p.id
  WHERE v.id = ?
`);

const getExistingCartItem = db.prepare(`
  SELECT *
  FROM cart_items
  WHERE user_id = ? AND product_id = ? AND variant_id = ?
`);

const insertCartItem = db.prepare(`
  INSERT INTO cart_items (user_id, product_id, variant_id, quantity)
  VALUES (?, ?, ?, ?)
`);

const updateCartItemQuantity = db.prepare(`
  UPDATE cart_items
  SET quantity = quantity + ?
  WHERE id = ?
`);
const getCartItems = db.prepare(`
  SELECT
    ci.id,
    ci.user_id,
    ci.variant_id,
    ci.quantity,
    v.price,
    v.stock,
    p.name
  FROM cart_items ci
  JOIN variants v ON ci.variant_id = v.id
  JOIN products p ON v.product_id = p.id
  WHERE ci.user_id = ?
  ORDER BY ci.id DESC
`);

router.get("/", (req, res) => {
  try {
    const userId = 1;
    const cartItems = getCartItems.all(userId);
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Server error while fetching cart" });
  }
});

router.post("/", (req, res) => {
  try {
    const userId = 1;
    const { variant_id, quantity } = req.body;

    const parsedVariantId = Number(variant_id);
    const parsedQuantity = Number(quantity) || 1;

    if (!parsedVariantId || parsedQuantity < 1) {
      return res.status(400).json({ error: "Valid variant_id and quantity are required" });
    }

    const variant = getVariantById.get(parsedVariantId);

    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    if (variant.stock < parsedQuantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const existingCartItem = getExistingCartItem.get(
      userId,
      variant.product_id,
      parsedVariantId
    );

    if (existingCartItem) {
      updateCartItemQuantity.run(parsedQuantity, existingCartItem.id);

      return res.json({
        message: "Cart item quantity updated",
        cart_item_id: existingCartItem.id,
        variant_id: parsedVariantId,
        quantity_added: parsedQuantity,
      });
    }

    const result = insertCartItem.run(
      userId,
      variant.product_id,
      parsedVariantId,
      parsedQuantity
    );

    res.status(201).json({
      message: "Item added to cart",
      cart_item_id: result.lastInsertRowid,
      variant_id: parsedVariantId,
      quantity: parsedQuantity,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Server error while adding to cart" });
  }
});

module.exports = router;