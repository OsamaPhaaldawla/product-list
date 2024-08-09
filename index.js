let desserts = document.querySelector(".desserts");

// Create Card Fucntion
function createCard(url, name, cat, price) {
  let card = document.createElement("div");
  card.classList.add("card");
  desserts.appendChild(card);

  let preview = document.createElement("div");
  preview.classList.add("preview");
  card.appendChild(preview);
  let img = document.createElement("img");
  img.src = url;
  preview.appendChild(img);
  let add = document.createElement("div");
  add.classList.add("add");

  let addContent = document.createElement("div");
  addContent.classList.add("addContent");
  add.appendChild(addContent);

  let icon = document.createElement("img");
  icon.src = "assets/images/icon-add-to-cart.svg";
  addContent.appendChild(icon);
  addContent.innerHTML += "Add to Cart";
  preview.appendChild(add);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);
  let cardCat = document.createElement("h3");
  cardCat.classList.add("card-title");
  cardCat.innerHTML = cat;
  cardBody.appendChild(cardCat);
  let cardName = document.createElement("p");
  cardName.innerHTML = name;
  cardBody.appendChild(cardName);
  let cardPrice = document.createElement("span");
  cardPrice.classList.add("price");
  cardPrice.innerHTML = Number.isInteger(+price)
    ? `$${price}.00`
    : `$${price}0`;
  cardBody.appendChild(cardPrice);
}

// content items
let mydata = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

mydata.forEach((ele) => {
  createCard(ele.image.desktop, ele.name, ele.category, ele.price);
});

let desList = document.querySelectorAll(".addContent");

function addEvents(desList) {
  desList.forEach((element, index) => {
    element.addEventListener("click", () => {
      element = element.parentElement;
      element.innerHTML = "";
      element.classList.add("quantity");

      let decrement = document.createElement("img");
      decrement.src = "assets/images/icon-decrement-quantity.svg";
      decrement.classList.add(`decrement-${index}`);
      element.appendChild(decrement);
      decrement.addEventListener("click", (e) => {
        let myQuantity = e.target.nextElementSibling;
        if (myQuantity.innerHTML > 0) {
          myQuantity.innerHTML--;
          updateCart(myQuantity);
        }
      });

      let quantity = document.createElement("span");
      quantity.innerHTML = 0;
      quantity.classList.add(`quantity-${index}`);
      quantity.setAttribute("data-count", index);
      element.appendChild(quantity);

      let increment = document.createElement("img");
      increment.src = "assets/images/icon-increment-quantity.svg";
      increment.classList.add(`increment-${index}`);
      element.appendChild(increment);
      increment.addEventListener("click", (e) => {
        let myQuantity = e.target.previousElementSibling;
        myQuantity.innerHTML++;
        updateCart(myQuantity);
      });
    });
  });
}
addEvents(desList);

function updateCart(myQuantity = "") {
  // Show the Cart
  let cart = document.querySelector(".cart");
  cart.classList.add("order");
  // list of items and total price
  let itemList = document.querySelector(".list");
  itemList.innerHTML = "";
  let totalPrice = document.querySelector(".total-box .total");
  let totalPriceCount = 0;
  // index of the updated item
  if (myQuantity != "") {
    let index = myQuantity.getAttribute("data-count");
    items[index].count = myQuantity.innerHTML;
  }
  // Cart items Number
  let cartNumber = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].count != 0) {
      // Box of the item
      let box = document.createElement("box");
      box.classList.add("box", "display");
      itemList.appendChild(box);
      // The name of the item
      let name = document.createElement("h4");
      name.innerHTML = items[i].name;
      box.appendChild(name);
      // Span for the item quantity
      let itemCount = document.createElement("span");
      itemCount.classList.add("count");
      itemCount.innerHTML = `x${items[i].count}`;
      box.appendChild(itemCount);
      // Price per one
      let itemprice = document.createElement("span");
      itemprice.classList.add("per-one");
      itemprice.innerHTML = Number.isInteger(+items[i].price)
        ? `$${items[i].price}.00`
        : `$${items[i].price}0`;
      box.appendChild(itemprice);
      // total price of
      let itemtotal = document.createElement("span");
      itemtotal.classList.add("per-all");
      let total = items[i].count * items[i].price;
      itemtotal.innerHTML = Number.isInteger(+total)
        ? `@$${total}.00`
        : `@$${total}0`;

      box.appendChild(itemtotal);
      // Remove icon
      let removeIcon = document.createElement("span");
      removeIcon.classList.add("remove");
      // remove icon image
      let removeIconImg = document.createElement("img");
      removeIconImg.src = "assets/images/icon-remove-item.svg";
      removeIcon.appendChild(removeIconImg);
      box.appendChild(removeIcon);
      // When Click Remove the item form the list
      removeIconImg.addEventListener("click", (e) => {
        let removedItemName =
          e.target.parentElement.parentElement.children[0].innerHTML;
        for (let i = 0; i < items.length; i++) {
          if (items[i].name == removedItemName) {
            items[i].count = 0;
            updateCart();
            document.querySelector(`.quantity-${i}`).innerHTML = 0;
          }
        }
      });
      // Update Cart Number
      cartNumber += +items[i].count;
      totalPriceCount += items[i].count * items[i].price;
    }
  }
  document.querySelector(".cart h3 span").innerHTML = cartNumber;
  totalPrice.innerHTML = Number.isInteger(+totalPriceCount)
    ? `$${totalPriceCount}.00`
    : `$${totalPriceCount}0`;
}

let items = [];
for (let i = 0; i < mydata.length; i++) {
  items.push({ name: mydata[i].name, count: 0, price: mydata[i].price });
}

// Confirm pop-up
let confirmBtn = document.querySelector(".confirm");
let popUp = document.querySelector(".pop-up");
let confirmList = document.querySelector(".pop-up .order-list");
let orderTotal = document.querySelector(".order-total p");

confirmBtn.addEventListener("click", () => {
  document.querySelector("main").classList.add("overlay");
  popUp.style.display = "block";
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].count != 0) {
      let itemName = items[i].name;
      let itemCount = items[i].count;
      for (let i = 0; i < mydata.length; i++) {
        if (itemName == mydata[i].name) {
          let order_box = document.createElement("div");
          order_box.classList.add("order-box");
          confirmList.appendChild(order_box);

          let box_img = document.createElement("img");
          box_img.src = mydata[i].image.thumbnail;
          order_box.appendChild(box_img);

          let box_content = document.createElement("div");
          box_content.classList.add("box-content");
          order_box.appendChild(box_content);

          let box_content_name = document.createElement("p");
          box_content_name.classList.add("name");
          box_content_name.innerHTML = mydata[i].name;
          box_content.appendChild(box_content_name);

          let count_price = document.createElement("p");
          count_price.classList.add("count-price");
          box_content.appendChild(count_price);

          let first_span = document.createElement("span");
          first_span.innerHTML = `x${itemCount}`;
          let second_span = document.createElement("span");
          second_span.innerHTML = `$${mydata[i].price}`;
          second_span.innerHTML = Number.isInteger(+`${mydata[i].price}`)
            ? `$${mydata[i].price}.00`
            : `$${mydata[i].price}0`;
          count_price.appendChild(first_span);
          count_price.appendChild(second_span);

          let span_price = document.createElement("span");
          span_price.classList.add("price");
          span_price.innerHTML = Number.isInteger(
            +`${+mydata[i].price * +itemCount}`
          )
            ? `$${+mydata[i].price * +itemCount}.00`
            : `$${+mydata[i].price * +itemCount}0`;
          total += +mydata[i].price * +itemCount;
          box_content.appendChild(span_price);

          confirmList.appendChild(order_box);
        }
      }
      orderTotal.innerHTML = Number.isInteger(+`${total}`)
        ? `$${total}.00`
        : `$${total}0`;
    }
  }
});

let newOrderBtn = document.querySelector(".pop-up button");
newOrderBtn.addEventListener("click", () => {
  confirmList.innerHTML = "";
  items = [];
  for (let i = 0; i < mydata.length; i++) {
    items.push({ name: mydata[i].name, count: 0, price: mydata[i].price });
  }
  updateCart();
  document.querySelector("main").classList.remove("overlay");
  popUp.style.display = "none";
  document.querySelector(".cart").classList.remove("order");
  let previews = document.querySelectorAll(".preview .add");
  let desList = [];
  previews.forEach((element) => {
    element.classList.remove("quantity");
    element.innerHTML = "";
    let addContent = document.createElement("div");
    addContent.classList.add("addContent");
    element.appendChild(addContent);

    let elementImg = document.createElement("img");
    elementImg.src = "assets/images/icon-add-to-cart.svg";
    addContent.appendChild(elementImg);

    let textNode = document.createTextNode("Add to Cart");
    addContent.appendChild(textNode);
    desList.push(addContent);
  });
  addEvents(desList);
});
