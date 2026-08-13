const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");

async function loadProducts() {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const variants = product.variants || [];
      const defaultVariant = variants[0];

      const defaultDescription =
        defaultVariant?.description || product.description || "No description available.";

      const defaultPrice = defaultVariant?.price ?? "N/A";
      const defaultStock = defaultVariant?.stock ?? "N/A";
      const defaultVariantId = defaultVariant?.id ?? "";

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3>${product.name}</h3>
        <p class="product-description">
          ${defaultDescription}
        </p>

        ${
          variants.length > 0
            ? `
              <label for="variant-${product.id}">Select option:</label>
              <select id="variant-${product.id}" class="variant-select">
                ${variants
                  .map(
                    (variant) => `
                      <option value="${variant.id}">
                        ${variant.option_value}
                      </option>
                    `
                  )
                  .join("")}
              </select>

              <p class="product-price">
                Price: $<span>${defaultPrice}</span>
              </p>
              <p class="product-stock">
                Stock: <span>${defaultStock}</span>
              </p>

              <button class="add-to-cart-btn" data-variant-id="${defaultVariantId}">
                Add to Cart
              </button>
            `
            : `
              <p class="product-price">Price: <span>N/A</span></p>
              <p class="product-stock">Stock: <span>N/A</span></p>
              <button class="add-to-cart-btn" disabled>
                Unavailable
              </button>
            `
        }
      `;

      const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
      const select = productCard.querySelector(".variant-select");

      if (select) {
        const descriptionEl = productCard.querySelector(".product-description");
        const priceEl = productCard.querySelector(".product-price span");
        const stockEl = productCard.querySelector(".product-stock span");

        select.addEventListener("change", (event) => {
          const selectedVariantId = Number(event.target.value);
          const selectedVariant = variants.find(
            (variant) => variant.id === selectedVariantId
          );

          if (!selectedVariant) return;

          descriptionEl.textContent =
            selectedVariant.description ||
            product.description ||
            "No description available.";
          priceEl.textContent = selectedVariant.price;
          stockEl.textContent = selectedVariant.stock;
          addToCartBtn.dataset.variantId = selectedVariant.id;
        });
      }

      if (!addToCartBtn.disabled) {
        addToCartBtn.addEventListener("click", async () => {
          const variantId = Number(addToCartBtn.dataset.variantId);

          if (!variantId) {
            alert("No product option selected.");
            return;
          }

          console.log("Selected variant ID:", variantId);

          try {
            const response = await fetch("/api/cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                variant_id: variantId,
                quantity: 1,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || "Failed to add item to cart");
            }

            console.log("Added to cart:", data);
            alert("Item added to cart");
            loadCart();
          } catch (error) {
            console.error("Error adding to cart:", error);
            alert(error.message);
          }
        });
      }

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error loading products:", error);
  }
}

async function loadCart() {
  try {
    const response = await fetch("/api/cart");

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const cartItems = await response.json();

    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cartContainer.innerHTML = cartItems
      .map(
        (item) => `
          <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
            <p>Stock: ${item.stock}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    cartContainer.innerHTML = "<p>Failed to load cart.</p>";
    console.error("Error loading cart:", error);
  }
}

loadProducts();
loadCart();