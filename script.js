const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const main = document.querySelector('main');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let productsData = [];

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
});

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        displayProducts(productsData);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных о продуктах:', error);
    });

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const matchingProducts = productsData.filter(product => product.name.toLowerCase().includes(searchTerm));
    main.innerHTML = '';
    displayProducts(matchingProducts);
});

function displayProducts(products) {
    products.forEach(product => {
        const productSection = document.createElement('section');
        productSection.className = 'product';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const h2 = document.createElement('h2');
        h2.textContent = product.name;

        const p = document.createElement('p');
        p.textContent = product.description;

        const span = document.createElement('span');
        span.className = 'price';
        span.textContent = `Цена: ${product.price === 0 ? 'Free' : `$${product.price}`}`;

        const button = document.createElement('button');
        button.textContent = 'Купить';

        const addToCartButton = document.createElement('button');
        addToCartButton.className = 'add-to-cart-button';
        const addToCartImage = document.createElement('img');
        addToCartImage.src = 'add-to-cart.png';
        addToCartImage.alt = 'Поместить в корзину';
        addToCartButton.appendChild(addToCartImage);

        productSection.appendChild(img);
        productSection.appendChild(h2);
        productSection.appendChild(p);
        productSection.appendChild(span);
        productSection.appendChild(addToCartButton);
        productSection.appendChild(button);

        main.appendChild(productSection);
    });
}
