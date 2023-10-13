
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

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

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const matchingProducts = productsData.filter(product => product.name.toLowerCase().includes(searchTerm));

    // Очищаем результаты поиска
    searchResults.innerHTML = '';

    if (matchingProducts.length > 0) {
        matchingProducts.forEach(product => {
            const resultItem = document.createElement('a');
            resultItem.href = '#' + product.id; // Замените на реальную ссылку товара
            resultItem.textContent = product.name;
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
});

// Закрываем результаты поиска при клике вне них
document.addEventListener('click', function(event) {
    if (event.target !== searchInput && event.target !== searchResults) {
        searchResults.style.display = 'none';
    }
});
