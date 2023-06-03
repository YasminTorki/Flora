

const productList = document.getElementById('product-list');

fetch('http://localhost:3000/xx')
  .then(response => response.json())
  .then(products => {
    products.slice(0, 6).forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const name = document.createElement('div');
      name.classList.add('product-name');
      name.textContent = product.name;
      productDiv.appendChild(name);

      const price = document.createElement('div');
      price.classList.add('product-price');
      price.textContent = `$ ${product.price}`;
      productDiv.appendChild(price);

      const productQuantity = document.createElement('input');
      productQuantity.type = 'number';
      productQuantity.value = '0';
      productQuantity.min = '0';
      productDiv.appendChild(productQuantity);

      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Add to cart';
      buttonElement.addEventListener('click', () => addToCart(product));
      productDiv.appendChild(buttonElement);

    

      productList.appendChild(productDiv);
    });
  })
  .catch(error => console.error(error));
  function addToCart(product) {
    window.location.href = "nav.html";
}
