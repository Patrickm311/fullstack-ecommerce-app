const db = require("./config/database");

// Clear existing products so you can re-run this safely
db.exec("DELETE FROM products");

const products = [
  { name: "Dumbbell 15 lb", price: 20, description: "Rubber hex dumbbell, great for beginners", category: "dumbbells", image: "/images/Dumbbell.jpg", stock: 25 },
  { name: "Dumbbell 20 lb", price: 25, description: "Rubber hex dumbbell, versatile weight", category: "dumbbells", image: "/images/Dumbbell.jpg", stock: 20 },
  { name: "Dumbbell 25 lb", price: 30, description: "Rubber hex dumbbell, intermediate level", category: "dumbbells", image: "/images/Dumbbell.jpg", stock: 18 },
  { name: "Dumbbell 30 lb", price: 35, description: "Rubber hex dumbbell, advanced training", category: "dumbbells", image: "/images/Dumbbell.jpg", stock: 15 },
  { name: "Kettlebell 15 lb", price: 21, description: "Cast iron kettlebell for swings and goblet squats", category: "kettlebells", image: "/images/kettlebell.png", stock: 20 },
  { name: "Kettlebell 20 lb", price: 26, description: "Cast iron kettlebell, great all-around weight", category: "kettlebells", image: "/images/kettlebell.png", stock: 18 },
  { name: "Kettlebell 25 lb", price: 31, description: "Cast iron kettlebell for intermediate lifters", category: "kettlebells", image: "/images/kettlebell.png", stock: 15 },
  { name: "Kettlebell 30 lb", price: 36, description: "Cast iron kettlebell for heavy training", category: "kettlebells", image: "/images/kettlebell.png", stock: 12 },
  { name: "Light Resistance Band", price: 10, description: "Perfect for warm-ups and mobility work", category: "bands", image: "/images/Rband.png", stock: 50 },
  { name: "Medium Resistance Band", price: 13, description: "Great for accessory exercises", category: "bands", image: "/images/Rband.png", stock: 45 },
  { name: "Heavy Resistance Band", price: 16, description: "For pull-up assistance and heavy stretching", category: "bands", image: "/images/Rband.png", stock: 40 },
  { name: "Band Set (3-pack)", price: 30, description: "Light, medium, and heavy bands bundle", category: "bands", image: "/images/Rband.png", stock: 30 },
  { name: "Yoga Mat", price: 25, description: "6mm thick, non-slip surface", category: "accessories", image: "/images/YogaMat.png", stock: 35 },
  { name: "Jump Rope", price: 12, description: "Adjustable speed rope for cardio", category: "accessories", image: "/images/JumpRope.png", stock: 40 },
  { name: "Foam Roller", price: 22, description: "High-density foam roller for recovery", category: "accessories", image: "/images/FoamRoller.png", stock: 25 },
  { name: "Weight Bench", price: 120, description: "Adjustable flat/incline bench", category: "accessories", image: "/images/WeightBench.png", stock: 8 },
];

const insert = db.prepare(`
  INSERT INTO products (name, price, description, category, image, stock)
  VALUES (@name, @price, @description, @category, @image, @stock)
`);

const insertMany = db.transaction((items) => {
  for (const item of items) {
    insert.run(item);
  }
});

insertMany(products);

console.log(`Seeded ${products.length} products into the database.`);