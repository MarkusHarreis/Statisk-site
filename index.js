fetch(`https://kea-alt-del.dk/t7/api/categories`)
  .then((response) => response.json())
  .then((categories) => {
    console.log(categories);

    let markup = "";
    categories.forEach((elm) => {
      markup += `<a href="productlist.html?category=${elm.category}"class="category_list_container">
        ${elm.category}
      </a>`;
    });

    document.querySelector(".categorylist").innerHTML = markup;
  });
