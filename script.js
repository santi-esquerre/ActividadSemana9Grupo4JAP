const API_LINK = "https://fakestoreapi.com/products";
const productTemp = document.querySelector("[product-template]");
const div = productTemp.content.cloneNode(true).children[0];
const productContainer = document.getElementById("container");
const search = document.getElementById("productSearch");
var products = [];

// Fetching data from API
async function getProducts() {
  try {
    const response = await fetch(API_LINK);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
    return error;
  }
}
function showArray(array) {
  let card, cardBody;
  console.log(div);
  array.forEach((element) => {
    if (
      element.image &&
      element.title &&
      element.price &&
      element.description &&
      element.category
    ) {
      card = document.importNode(div, true);
      cardBody = card.querySelector(".card-body");
      const img = card.querySelector("[prod-img]");
      const title = cardBody.querySelector("[prod-title]");
      const price = cardBody.querySelector("[prod-price]");
      const desc = cardBody.querySelector("[prod-desc]");
      const category = cardBody.querySelector("[prod-cat]");
      img.src = element.image;
      title.textContent = element.title;
      price.textContent += element.price;
      desc.textContent = element.description;
      category.textContent = element.category;
      productContainer.append(card);
    } else {
      alert("No hay datos disponibles");
    }
  });
}
async function showProducts() {
  products = await getProducts();
  console.log(products);
  showArray(products);
}

// Search functionality
search.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value)
    );
  });
  if (value.trim().length > 0) {
    productContainer.innerHTML = "";
    showArray(filteredProducts);
  } else {
    productContainer.innerHTML = "";
    showProducts();
  }
});
document.addEventListener("DOMContentLoaded", showProducts);
