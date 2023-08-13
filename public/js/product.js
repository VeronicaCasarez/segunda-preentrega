document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = document.getElementById('query').value;
      await fetchProducts(query);
    });
  
    async function fetchProducts(query) {
      const response = await fetch(`/products?query=${query}`);
      const data = await response.json();
      renderProducts(data.payload);
      renderPagination(data);
    }
  
    function renderProducts(products) {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
          <h2>${product.name}</h2>
          <p>Category: ${product.category}</p>
          <p>Availability: ${product.availability}</p>
          <p>Price: ${product.price}</p>
        `;
        productList.appendChild(productItem);
      });
    }
  
    function renderPagination(data) {
      const paginationDiv = document.getElementById('pagination');
      paginationDiv.innerHTML = '';
      if (data.hasPrevPage) {
        const prevLink = document.createElement('a');
        prevLink.href = data.prevLink;
        prevLink.textContent = 'Previous Page';
        paginationDiv.appendChild(prevLink);
      }
      if (data.hasNextPage) {
        const nextLink = document.createElement('a');
        nextLink.href = data.nextLink;
        nextLink.textContent = 'Next Page';
        paginationDiv.appendChild(nextLink);
      }
    }
  });
  