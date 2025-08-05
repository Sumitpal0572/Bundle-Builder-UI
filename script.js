const products = [
    { id: 1, name: "Tie-Dye Lounge Set", price: 980, image: "assets/Photos/product-1.jpg" },
    { id: 2, name: "Sunburst Tracksuit", price: 1020, image: "assets/Photos/product-2.jpg" },
    { id: 3, name: "Retro Red Streetwear", price: 990, image: "assets/Photos/product-3.jpg" },
    { id: 4, name: "Urban Sportswear Combo", price: 950, image: "assets/Photos/product-4.jpg" },
    { id: 5, name: "Oversized Knit & Coat", price: 1140, image: "assets/Photos/product-5.jpg" },
    { id: 6, name: "Chic Monochrome Blazer", price: 960, image: "assets/Photos/product-6.jpg" }
];

const productContainer = document.getElementById("productContainer");
const selectedList = document.getElementById("selectedList");
const subtotalAmount = document.getElementById("subtotalAmount");
const discountAmount = document.getElementById("discountAmount");
const proceedBtn = document.getElementById("proceedBtn");

let selectedItems = [];

function renderProducts() {
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id;

        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="info">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
      </div>
      <button>
        <span>Add to Bundle</span>
        <span>+</span>
      </button>
    `;

        productContainer.appendChild(card);
    });
}



function updateSidebar() {
    selectedList.innerHTML = "";
    let subtotal = 0;

    selectedItems.forEach(item => {
        const li = document.createElement("li");
        subtotal += item.price * item.quantity;

        li.innerHTML = `
      <img src="${item.image}" alt="">
      <div>
        <div>${item.name}<br><small>₹${item.price.toFixed(2)}</small></div>
        <div class="quantity-control">
          <button class="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
          <button class="delete" data-id="${item.id}">🗑️</button>
        </div>
      </div>
    `;
        selectedList.appendChild(li);
    });

    const discount = selectedItems.length >= 3 ? subtotal * 0.3 : 0;
    discountAmount.textContent = `- ₹${discount.toFixed(2)}`;
    subtotalAmount.textContent = `₹${subtotal.toFixed(2)}`;

    proceedBtn.disabled = selectedItems.length < 3;

    // Update button styles in grid
    document.querySelectorAll(".product-card").forEach(card => {
        const id = parseInt(card.dataset.id);
        const btn = card.querySelector("button");
        if (selectedItems.some(p => p.id === id)) {
            btn.classList.add("added");
            btn.innerHTML = `<span>Added to Bundle</span><span>&#10003;</span>`;
        } else {
            btn.classList.remove("added");
            btn.innerHTML = `<span>Add to Bundle</span><span>+</span>`;
        }
    });
}


// Quantity adjustments


selectedList.addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);

    if (e.target.matches("button.decrease")) {
        const item = selectedItems.find(p => p.id === id);
        if (item.quantity > 1) {
            item.quantity--;
        }
        updateSidebar();
    }

    if (e.target.matches("button.increase")) {
        const item = selectedItems.find(p => p.id === id);
        item.quantity++;
        updateSidebar();
    }

    if (e.target.matches("button.delete")) {
        selectedItems = selectedItems.filter(p => p.id !== id);
        updateSidebar();
    }
});


productContainer.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const id = parseInt(card.dataset.id);
    const index = selectedItems.findIndex(p => p.id === id);

    if (index >= 0) {
        selectedItems.splice(index, 1);
    } else {
        const product = products.find(p => p.id === id);
        selectedItems.push({ ...product, quantity: 1 });
    }

    updateSidebar();
});

proceedBtn.addEventListener("click", () => {
    console.log("Selected bundle:", selectedItems);
    alert("Bundle logged to console!");
});

renderProducts();

