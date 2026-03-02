const listcontainer = document.querySelector(".grid_1-1-1-1");
const endpoint = "https://kea-alt-del.dk/t7/api/products";

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showProducts);
}

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    markup += `
      <article class="smallProduct 
        ${product.soldout ? "soldOut" : ""} 
        ${product.discount ? "onSale" : ""}">
        
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
