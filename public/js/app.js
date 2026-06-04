const productsContainer = document.getElementById("products-container");
console.log("app.js loaded");
console.log(productsContainer);

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button>Add to Cart</button>
      `;

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error loading products:", error);
  }
}

loadProducts();