const products = [
  {
    id: 1,
    name: 'iPhone 13',
    image: 'https://static.re-store.ru/upload/resize_cache/iblock/211/100500_800_140cd750bba9870f18aada2478b24840a/2112dad8fea93d950866fcec02b3083f.jpg',
    description: 'Apple iPhone 13 с объёмом памяти 128 ГБ.',
    price: 57490
  },
  {
    id: 2,
    name: 'iPhone 14',
    image: 'https://entertel.ru/image/cache/catalog/iphone/13/d8bd0dd74bc298feec877c076eaff574_437-1000x1000.jpeg',
    description: 'Apple iPhone 14 с объёмом памяти 128 ГБ.',
    price: 66490
  },
  {
    id: 3,
    name: 'iPhone 15',
    image: 'https://static.re-store.ru/upload/resize_cache/iblock/289/100500_800_140cd750bba9870f18aada2478b24840a/29pz6tdc6d0mihri41i2jhif71yx4s2m.jpg',
    description: 'Apple iPhone 15 с объёмом памяти 128 ГБ.',
    price: 89990
  },

  {
    id: 4,
    name: 'iPhone 13 Pro',
    image: 'https://apple-com.ru/image/cache/catalog/product/iphone%2013%20Pro/7593f119f5b894515816ef7bdfb336a0-800x700h.jpg.webp',
    description: 'Apple iPhone 13 Pro с объёмом памяти 128 ГБ.',
    price: 68490
  },
  {
    id: 5,
    name: 'iPhone 14 Pro',
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/a3891d90fa40dc0a991c17574540f6a9/2c598fe1cf537cfa55e3e3030624119550e923cb2ec5f7633a8711adadc2dab4.jpg.webp',
    description: 'Apple iPhone 14 Pro с объёмом памяти 128 ГБ.',
    price: 92990
  },
  {
    id: 6,
    name: 'iPhone 15 Pro',
    image: 'https://static.re-store.ru/upload/resize_cache/iblock/c1d/100500_800_140cd750bba9870f18aada2478b24840a/n46kcr8dng613hzv2smui43d8tsx7lct.jpg',
    description: 'Apple iPhone 15 Pro с объёмом памяти 128 ГБ.',
    price: 126990
  },

  {
    id: 7,
    name: 'iPhone 13 Pro Max',
    image: 'https://apple-com.ru/image/cache/catalog/product/iphone%2013%20Pro%20Max/01a93d189ee97c41007d0bcb7b53efdb-800x700h.jpg.webp',
    description: 'Apple iPhone 13 Pro Max с объёмом памяти 256 ГБ.',
    price: 82990
  },
  {
    id: 8,
    name: 'iPhone 14 Pro Max',
    image: 'https://static.re-store.ru/upload/resize_cache/iblock/a1e/100500_800_140cd750bba9870f18aada2478b24840a/a1ea280a3cd247b7b7c4dee2bbb02534.jpeg',
    description: 'Apple iPhone 14 Pro Max с объёмом памяти 256 ГБ.',
    price: 102490
  },
  {
    id: 9,
    name: 'iPhone 15 Pro Max',
    image: 'https://static.re-store.ru/upload/resize_cache/iblock/fd1/100500_800_140cd750bba9870f18aada2478b24840a/kmghepd0m3xl1yj1o86it2wjunied78b.jpg',
    description: 'Apple iPhone 15 Pro Max с объёмом памяти 256 ГБ.',
    price: 142990
  },
];

const productsSection = document.getElementById("products");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  productsSection.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>${product.price}&nbsp;₽</strong></p>
      <button class="buy-button" data-product-id="${product.id}">Добавить в корзину</button>
    `;
    productsSection.appendChild(productDiv);
  });

  const buyButtons = document.querySelectorAll(".buy-button");
  buyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const product = products.find((product) => product.id === parseInt(productId));

      if (!product.quantity) {
        product.quantity = 1;
        cart.push(product);
      } else {
        const cartItem = cart.find((item) => item.id === product.id);
        cartItem.quantity++;
      }

      saveCartToLocalStorage();
      updateCartCount();
      renderCartItems();
      openCartModal();
    });
  });
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.reduce((total, product) => total + product.quantity, 0);
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-info">
        <h6>${product.name}</h6>
        <div class="quantity-buttons">
          <button class="btn btn-sm btn-secondary" data-action="decrease">-</button>
          <span>${product.quantity}</span>
          <button class="btn btn-sm btn-secondary" data-action="increase">+</button>
        </div>
        <p><strong>${product.price * product.quantity}&nbsp;₽</strong></p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    const decreaseButton = cartItem.querySelector("[data-action='decrease']");
    const increaseButton = cartItem.querySelector("[data-action='increase']");

    decreaseButton.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
        saveCartToLocalStorage();
        updateCartCount();
        renderCartItems();
      } else {
        const index = cart.indexOf(product);
        cart.splice(index, 1);
        saveCartToLocalStorage();
        updateCartCount();
        renderCartItems();
      }
    });

    increaseButton.addEventListener("click", () => {
      product.quantity++;
      saveCartToLocalStorage();
      updateCartCount();
      renderCartItems();
    });

    totalPrice += product.price * product.quantity;
  });

  const totalPriceElement = document.createElement("div");
  totalPriceElement.className = "total-price";
  totalPriceElement.innerHTML = `
    <hr>
    <p><strong>Итого: ${totalPrice}&nbsp;₽</strong></p>
  `;
  cartItemsContainer.appendChild(totalPriceElement);
}

function openCartModal() {
  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
}

renderProducts();
updateCartCount();
renderCartItems();

document.getElementById("cart-icon").addEventListener("click", openCartModal);

const loginButton = document.querySelector('.login-button');
const registerButton = document.querySelector('#register-button');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

loginButton.addEventListener('click', function() {
  loginModal.show();
});

registerButton.addEventListener('click', function() {
  registerModal.show();
});

$(document).ready(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault();

    $('.form-control').removeClass('error');
    $('.auth-error-message').text('').removeClass('visible');

    $.ajax({
      url: 'login.php',
      type: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        if (response.trim() === 'success') {
          location.reload();
        } else {
          $('#login').addClass('error');
          $('#password').addClass('error');

          $('#loginModal .auth-error-message').text('Неверный логин или пароль').addClass('visible');

          $('#loginModal .modal-content').css('height', 'auto');
        }
      },
      error: function() {
        console.log('Error occurred');
      }
    });
  });
});