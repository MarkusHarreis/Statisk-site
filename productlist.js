const klikKategori = new URLSearchParams(window.location.search);
const endpoint = `https://kea-alt-del.dk/t7/api/products?${klikKategori}`;
console.log(endpoint);

const listcontainer = document.querySelector("main");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showProducts);
}

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    markup += `
      <article class="smallProduct">
   <a href="productdetails.html?id=${product.id}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
             alt="${product.productdisplayname}" />

        <h3>${product.productdisplayname}</h3>

        <p class="subtle">${product.brandname}</p>

        <p class="price">
          DKK <span>${product.price}</span>,-
        </p>

        ${
          product.discount
            ? `
          <div class="discounted">
            <p>
              Now DKK 
              <span>
                ${Math.round(
                  product.price - (product.price * product.discount) / 100,
                )}
              </span>,-
            </p>
            <p><span>${product.discount}</span>%</p>
          </div>
          `
            : ""
        }

        <a href="product.html?id=${product.id}">Read More</a>
      </article>
    `;
  });

  listcontainer.innerHTML = markup;
}

getData();
