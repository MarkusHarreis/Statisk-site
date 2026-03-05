const klikKategori = new URLSearchParams(window.location.search);
const endpoint = `https://kea-alt-del.dk/t7/api/products?${klikKategori}&limit=30`;
console.log(endpoint);

const listcontainer = document.querySelector("main");

document
  .querySelectorAll("button")
  .forEach((knap) => knap.addEventListener("click", filter));

let allData;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      showProducts(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    showProducts(allData);
  } else {
    const udsnit = allData.filter((element) => element.gender == valgt);
    showProducts(udsnit);
  }
}

function showProducts(products) {
  let markup = "";
  console.log(products);
  products.forEach((product) => {
    markup += `
      <article class="smallProduct ${product.soldout && "soldOut"}">
    <a href="productdetails.html?id=${product.id}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
             alt="${product.productdisplayname}" />

        <h3>${product.productdisplayname}</h3>

        <p class="subtle">${product.brandname}</p>

        <p class="price">
          DKK <span>${product.price}</span>,-
        </p>
        <div class=${product.discount ? "discount" : "hide"}>
        <p>Now DKK <span>${Math.round(product.price - (product.price * product.discount) / 100)}</span>,-</p>
        <div class="tilbud">
        ${product.discount ? `<p>${product.discount}%</p>` : ""}
        </div>
        </div>
        <a href="product.html?id=${product.id}">Read More</a>
      </article>
    `;
  });

  listcontainer.innerHTML = markup;
}

getData();
