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
        <p>₹${product.price}</p>
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
        li.innerHTML = `
      <img src="${item.image}" alt="">
      <span>${item.name}</span>
    `;
        selectedList.appendChild(li);
        subtotal += item.price;
    });

    if (selectedItems.length >= 3) {
        const discount = subtotal * 0.3;
        discountAmount.textContent = `- ₹${discount.toFixed(2)}`;
        subtotalAmount.textContent = `₹${(subtotal - discount).toFixed(2)}`;
        proceedBtn.disabled = false;
    } else {
        discountAmount.textContent = `- ₹0.00`;
        subtotalAmount.textContent = `₹${subtotal.toFixed(2)}`;
        proceedBtn.disabled = true;
    }
}

productContainer.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const id = parseInt(card.dataset.id);
    const index = selectedItems.findIndex(p => p.id === id);

    if (index >= 0) {
        selectedItems.splice(index, 1);
        card.classList.remove("selected");
    } else {
        selectedItems.push(products.find(p => p.id === id));
        card.classList.add("selected");
    }

    updateSidebar();
});

proceedBtn.addEventListener("click", () => {
    console.log("Selected bundle:", selectedItems);
    alert("Bundle logged to console!");
});

renderProducts();
