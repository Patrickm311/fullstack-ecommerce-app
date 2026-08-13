const db = require("./config/database");

db.exec(`
  DELETE FROM variants;
  DELETE FROM products;
`);

const products = [
  {
    name: "Dumbbell",
    description: "Rubber hex dumbbell",
    category: "dumbbells",
    image: "/images/Dumbbell.jpg",
    variants: [
      {
        option_value: "15 lb",
        price: 20,
        stock: 25,
        description: "Great for beginners",
      },
      {
        option_value: "20 lb",
        price: 25,
        stock: 20,
        description: "Versatile weight",
      },
      {
        option_value: "25 lb",
        price: 30,
        stock: 18,
        description: "Intermediate level",
      },
      {
        option_value: "30 lb",
        price: 35,
        stock: 15,
        description: "Advanced training",
      },
    ],
  },
  {
    name: "Kettlebell",
    description: "Cast iron kettlebell",
    category: "kettlebells",
    image: "/images/kettlebell.png",
    variants: [
      {
        option_value: "15 lb",
        price: 21,
        stock: 20,
        description: "For swings and goblet squats",
      },
      {
        option_value: "20 lb",
        price: 26,
        stock: 18,
        description: "Great all-around weight",
      },
      {
        option_value: "25 lb",
        price: 31,
        stock: 15,
        description: "For intermediate lifters",
      },
      {
        option_value: "30 lb",
        price: 36,
        stock: 12,
        description: "For heavy training",
      },
    ],
  },
  {
    name: "Resistance Band",
    description: "Resistance band for training and mobility",
    category: "bands",
    image: "/images/Rbands.png",
    variants: [
      {
        option_value: "Light",
        price: 10,
        stock: 50,
        description: "Perfect for warm-ups and mobility work",
      },
      {
        option_value: "Medium",
        price: 13,
        stock: 45,
        description: "Great for accessory exercises",
      },
      {
        option_value: "Heavy",
        price: 16,
        stock: 40,
        description: "For pull-up assistance and heavy stretching",
      },
      {
        option_value: "3-pack Set",
        price: 30,
        stock: 30,
        description: "Light, medium, and heavy bands bundle",
      },
    ],
  },
  {
    name: "Yoga Mat",
    description: "6mm thick, non-slip surface",
    category: "accessories",
    image: "/images/YogaMat.png",
    variants: [
      {
        option_value: "Standard",
        price: 25,
        stock: 35,
        description: "6mm thick, non-slip surface",
      },
    ],
  },
  {
    name: "Jump Rope",
    description: "Adjustable speed rope for cardio",
    category: "accessories",
    image: "/images/JumpRope.png",
    variants: [
      {
        option_value: "Standard",
        price: 12,
        stock: 40,
        description: "Adjustable speed rope for cardio",
      },
    ],
  },
  {
    name: "Foam Roller",
    description: "High-density foam roller for recovery",
    category: "accessories",
    image: "/images/FoamRoller.png",
    variants: [
      {
        option_value: "Standard",
        price: 22,
        stock: 25,
        description: "High-density foam roller for recovery",
      },
    ],
  },
  {
    name: "Weight Bench",
    description: "Adjustable flat/incline bench",
    category: "accessories",
    image: "/images/WeightBench.png",
    variants: [
      {
        option_value: "Standard",
        price: 120,
        stock: 8,
        description: "Adjustable flat/incline bench",
      },
    ],
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products (name, description, category, image)
  VALUES (@name, @description, @category, @image)
`);

const insertVariant = db.prepare(`
  INSERT INTO variants (product_id, option_value, price, stock, description)
  VALUES (@product_id, @option_value, @price, @stock, @description)
`);

const insertUser = db.prepare(`
  INSERT INTO users (email, password, name)
  VALUES (@email, @password, @name)
`);

const seedDatabase = db.transaction((products) => {
  for (const product of products) {
    const productResult = insertProduct.run({
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
    });

    const productId = productResult.lastInsertRowid;

    for (const variant of product.variants) {
      insertVariant.run({
        product_id: productId,
        option_value: variant.option_value,
        price: variant.price,
        stock: variant.stock,
        description: variant.description,
      });
    }
  }
});

insertUser.run({
  email: "test@example.com",
  password: "test123",
  name: "Test User",
});

seedDatabase(products);

console.log(`Seeded ${products.length} base products with variants.`);