const tax_Rate = 0.18;
const shipping_Price = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  calculateCartPrice();
  //add items to localStorage

  localStorage.setItem("tax_Rate", tax_Rate);
  localStorage.setItem("shipping_Price", shipping_Price);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //add items to sessionStorage
  //   sessionStorage.setItem("tax_Rate", tax_Rate);
  //   sessionStorage.setItem("shipping_Price", shipping_Price);
  //   sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const divProducts = document.querySelector(".products");
//capturing vs bubbling
divProducts.addEventListener("click", (event) => {
  //dom traversing örnekleri
  if (event.target.className == "fa-solid fa-minus") {
    // console.log("minus btn çalıştı");
    //event.target.parentElement ile ilgili alanda ki elemanın parentını aldık ve o parent içinde değiştirmek istediğimiz classı querySelector ile seçtik.
    if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
      event.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(event.target);
      calculateCartPrice();
    } else {
      //remove butonuna basmadan minus yoluyla 0'a düşürüp silmek isterseniz gibi bir seçenek sunuyoruz kullanıcıya.
      if (
        confirm(
          `${
            event.target.parentElement.parentElement.querySelector("h2")
              .innerText
          } silinecek!`
        )
      ) {
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
      }
    }
  } else if (event.target.classList.contains("fa-plus")) {
    // console.log("plus btn çalıştı.");
    // plus'a bastığımız zaman bastığımız butonun önceki element kardeşini alıyoruz ve onun innerTextini etkiledik.
    event.target.previousElementSibling.innerText++;
    calculateProductPrice(event.target);
    calculateCartPrice();
  } else if (event.target.className == "remove-product") {
    // console.log("remove btn çalıştı");
    calculateCartPrice();
  } else {
    // console.log("diğer elementler çalıştı");
  }
});
const calculateProductPrice = (btn) => {
  //Btn üzerinden adet arttıkça fiyatın artmasını sağladık.
  const productInfoDiv = btn.parentElement.parentElement;
  //   console.log(productInfoDiv);
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
};
const calculateCartPrice = () => {
  const productsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );

  let subtotal = 0;
  productsTotalPricesDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  //   console.log(subtotal);
  const taxPrice = subtotal * localStorage.getItem("taxRate");

  const shipping_Price = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shipping_Price")
      : 0
  );
  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").children[1].innerText =
    shipping_Price.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText = (
    subtotal +
    taxPrice +
    shipping_Price
  ).toFixed(2);
};
