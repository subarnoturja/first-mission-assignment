// Global variables
let products = [];
let categories = [];
let currentCategory = "all";

// Fetch categories from API
async function fetchCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  categories = await response.json();
  renderCategoryButtons();
}

// Render category buttons dynamically
function renderCategoryButtons() {
  const container = document.getElementById("categoryButtons");

  let buttonsHTML = `
                <button class="category-btn active px-6 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-600" data-category="all">
                    All
                </button>
            `;

  categories.forEach((category) => {
    const displayName = category.charAt(0).toUpperCase() + category.slice(1);
    buttonsHTML += `
                    <button class="category-btn px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-600" data-category="${category}">
                        ${displayName}
                    </button>
                `;
  });

  container.innerHTML = buttonsHTML;

  // Add click event listeners
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      currentCategory = category;
      fetchProducts(category);
    });
  });
}

// Fetch products from API
async function fetchProducts(category = "all") {
  try {
    document.getElementById("productsGrid").innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <div class="spinner"></div>
                        <p class="mt-4 text-gray-600">Loading products...</p>
                    </div>
                `;

    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    const response = await fetch(url);
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("productsGrid").innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Unable to Load Products</h3>
                        <p class="text-gray-600 mb-4">Please check your internet connection and try again.</p>
                        <button onclick="fetchProducts('${category}')" class="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none">
                            Retry
                        </button>
                    </div>
                `;
  }
}

// Create product card HTML
function createProductCard(product) {
  const truncatedTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + "..."
      : product.title;

  return `
                <div class="product-card bg-white rounded-lg overflow-hidden border border-gray-200 fade-in">
                    <div class="relative bg-gray-100 h-64 flex items-center justify-center p-4">
                        <img src="${product.image}" 
                             alt="${product.title}" 
                             class="max-w-full max-h-full object-contain"
                             onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Available'" />
                    </div>
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="badge bg-indigo-100 text-indigo-600 border-none text-xs capitalize">${product.category}</span>
                            <div class="flex items-center text-sm text-gray-600">
                                <span class="text-yellow-500 mr-1">⭐</span>
                                <span class="font-medium">${product.rating.rate}</span>
                                <span class="text-gray-400 ml-1">(${product.rating.count})</span>
                            </div>
                        </div>
                        <h3 class="text-base font-semibold text-gray-900 mb-2 h-12 overflow-hidden">${truncatedTitle}</h3>
                        <p class="text-2xl font-bold text-gray-900 mb-4">$${product.price}</p>
                        <div class="flex gap-3">
                            <button onclick="openProductModal(${product.id})" class="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 flex-1 h-11 min-h-0 text-sm">
                                <i class="fa-regular fa-eye"></i>
                                Details
                            </button>
                            <button class="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white flex-1 h-11 min-h-0 text-sm">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
}

// Render products
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (products.length === 0) {
    grid.innerHTML =
      '<p class="col-span-full text-center text-gray-600 py-12">No products found in this category.</p>';
    return;
  }
  grid.innerHTML = products
    .map((product) => createProductCard(product))
    .join("");
}

// Open product modal with full details
async function openProductModal(productId) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
    );
    const product = await response.json();

    const modalContent = document.getElementById("modalContent");

    // Create star rating visualization
    const fullStars = Math.floor(product.rating.rate);
    const hasHalfStar = product.rating.rate % 1 >= 0.5;
    let starsHTML = "";

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += '<span class="text-yellow-500 text-xl">★</span>';
      } else if (i === fullStars && hasHalfStar) {
        starsHTML += '<span class="text-yellow-500 text-xl">⯨</span>';
      } else {
        starsHTML += '<span class="text-gray-300 text-xl">★</span>';
      }
    }

    modalContent.innerHTML = `
                    <div class="flex items-center justify-center bg-gray-100 rounded-lg p-8">
                        <img src="${product.image}" 
                             alt="${product.title}" 
                             class="max-w-full max-h-96 object-contain"
                             onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Available'" />
                    </div>
                    <div class="flex flex-col justify-between">
                        <div>
                            <span class="badge bg-indigo-100 text-indigo-600 border-none text-xs capitalize mb-3">${product.category}</span>
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">${product.title}</h3>
                            <div class="flex items-center gap-3 mb-4">
                                <div class="flex items-center">
                                    ${starsHTML}
                                </div>
                                <span class="text-gray-600 font-medium">${product.rating.rate}</span>
                                <span class="text-gray-400">(${product.rating.count} reviews)</span>
                            </div>
                            <p class="text-3xl font-bold text-indigo-600 mb-6">$${product.price}</p>
                            <div class="mb-6">
                                <h4 class="font-semibold text-gray-900 mb-2">Description:</h4>
                                <p class="text-gray-700 leading-relaxed">${product.description}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <button class="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white flex-1">
                                <i class="fa-regular fa-eye"></i>
                                Add to Cart
                            </button>
                            <button class="btn bg-green-600 hover:bg-green-700 border-none text-white flex-1">
                                <i class="fa-solid fa-bolt"></i>
                                Buy Now
                            </button>
                        </div>
                    </div>
                `;

    document.getElementById("productModal").showModal();
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert(
      "Unable to load product details. Please check your connection and try again.",
    );
  }
}

fetchCategories();
fetchProducts("all");