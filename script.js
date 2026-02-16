// Fetch categories from API
const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories")
    const categories = await res.json();
    renderCategoryButtons(categories);
}

// Render category buttons dynamically
const renderCategoryButtons = (categories) => {
    const container = document.getElementById("categoryButtons");

    categories.forEach(category => {
        console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="category-btn px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-600">
            ${category}
        </button>`;
        
        container.appendChild(div);
    })
}

fetchCategories()