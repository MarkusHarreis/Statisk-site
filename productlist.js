const klikKategori = new URLSearchParams(window.location.search);
const endpoint = `https://kea-alt-del.dk/t7/api/products?${klikKategori}&limit=30`;
console.log(endpoint);

const listcontainer = document.querySelector("main");

document
  .querySelectorAll(".filterBtn button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

let allData;
let udsnit;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = udsnit = data;
      showProducts(allData);
    });
}

function sorter(e) {
  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;
    if (dir == "up") {
      udsnit.sort((a, b) => a.price - b.price);
    } else {
      udsnit.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = e.target.dataset.text;
    if (dir == "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showProducts(udsnit);
}

function filter(e) {
  const valgt = e.target.textContent.trim();

  if (valgt === "All") {
    udsnit = [...allData];
  } else {
    udsnit = allData.filter((element) => element.gender === valgt);
  }
  showProducts(udsnit);
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

        <p class="price ${product.discount ? "oldPrice" : ""}">
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
