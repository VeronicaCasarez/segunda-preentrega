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
        <button class="add-to-cart-button" data-productid="${product._id}">Add to Cart</button>
        <button class="view-details-button" data-productid="${product._id}">View Details</button>
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

  // Lógica para agregar el producto al carrito
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', async (event) => {
      const productId = event.target.getAttribute('data-productid');

      
      const response = await fetch(`/:cid/product/${productId}`, {
           method: 'POST',
    
      });

      // Maneja la respuesta de la API
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Muestra un mensaje al usuario
      } else {
        alert('Error al agregar el producto al carrito');
      }
    });
  });
})
  // Lógica para mostrar los detalles del producto
  document.querySelectorAll('.view-details-button').forEach(button => {
    button.addEventListener('click', (event) => {
      //const productId = toString(event.currentTarget.id);
      const productId = toString(event.target.getAttribute('id'));
     
      console.log(productId);
  
      // redirigir a la ruta de detalles del producto usando el ID
      window.location.href = `http://localhost:8080/api/products/detail/${productId}`;
    });
  });

