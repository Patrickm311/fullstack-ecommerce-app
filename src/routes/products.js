const express = require("express");
const router = express.Router();
const db = require("../config/database");

const getVariantsByProductId = db.prepare(`
  SELECT id, product_id, option_value, price, stock, description, created_at
  FROM variants
  WHERE product_id = ?
  ORDER BY id
`);

router.get("/", (req, res) => {
  const { category } = req.query;

  let products;

  if (category) {
    products = db
      .prepare("SELECT * FROM products WHERE category = ? ORDER BY id")
      .all(category);
  } else {
    products = db.prepare("SELECT * FROM products ORDER BY id").all();
  }

  const productsWithVariants = products.map((product) => ({
    ...product,
    variants: getVariantsByProductId.all(product.id),
  }));

  res.json(productsWithVariants);
});

router.post("/", (req, res) => {
  const { name, description, category, image } = req.body;

  if (!name || !description || !category || !image) {
    return res.status(400).json({ error: "All product fields are required" });
  }

  const result = db
    .prepare(`
      INSERT INTO products (name, description, category, image)
      VALUES (?, ?, ?, ?)
    `)
    .run(name, description, category, image);

  const newProduct = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json({
    ...newProduct,
    variants: [],
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const variants = getVariantsByProductId.all(id);

  res.json({
    ...product,
    variants,
  });
});

module.exports = router;