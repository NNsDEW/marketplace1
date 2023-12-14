const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const main = document.querySelector('main');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let productsData = [];
let displayedProducts = [];

window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = document.documentElement.scrollTop > 100 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
});

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        displayedProducts = data;
        displayProducts(displayedProducts);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных о продуктах:', error);
    });

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    displayedProducts = productsData.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(displayedProducts);
});

function displayProducts(products) {
    main.innerHTML = ''; 

    if (products.length === 0) {
        main.innerHTML = 'No matching products found.';
        return;
    }

    products.forEach(product => {
        const productSection = document.createElement('section');
        productSection.className = 'product';

        productSection.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">Цена: ${product.price === 0 ? 'Free' : `$${product.price}`}</span>
            <button class="add-to-cart-button">
                <img src="add-to-cart.png" alt="Поместить в корзину">
            </button>
            <button>Купить</button>
        `;

        main.appendChild(productSection);
    });
}
