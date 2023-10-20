const closeButton = document.getElementById("close");
const htmlBody = document.querySelector("body");
const productListHTML = document.querySelector(".list");
const cartListHTML = document.querySelector(".cartList");
const cartButton = document.querySelector(".cart-icon");
const cartCounter = document.getElementById("cartCounter");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
console.log("Plus element: ", plus);
console.log("Minus element: ", minus);


const mercuryFile = "collection-files/Mercury.json";

let productArray = [];
let cartArray = [];

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function findProductIndexByID(array, ID) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].product_id === ID) {
            return i;
        }
    }
    return -1;
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

cartButton.addEventListener('click', () => {
    htmlBody.classList.toggle("showCart");
});

closeButton.addEventListener('click', function () {
    htmlBody.classList.toggle("showCart");
});

const addDataToHTML = () => {
    productListHTML.innerHTML = '';
    if (productArray.length > 0) {
        const shuffledProducts = shuffleArray(productArray);
        shuffledProducts.forEach((product) => {
            let newProduct = document.createElement('div');
            if (product.isPrintful) {
                newProduct.classList.add("product", "aura");
                newProduct.dataset.id = product.product_id;
                newProduct.innerHTML = `
          <img src="images/verse-logo-vdrop_mercury.svg" class="placeholder" alt="Product Image">
          <h2>${product.name}</h2>
          <div class="price">$${product.price}</div>
          <button class="addCart btn draw-border">Add To Cart</button>
        `;
                productListHTML.appendChild(newProduct);
            }
        });
    }
};

productListHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart = (productId) => {
    let positionOfProductInCart = cartArray.findIndex((value) => value.product_id == productId);
    if (cartArray.length <= 0) {
        cartArray = [{
            product_id: productId,
            quantity: 1
        }];
    } else if (positionOfProductInCart < 0) {
        cartArray.push({
            product_id: productId,
            quantity: 1
        });
    } else {
        cartArray[positionOfProductInCart].quantity++;
    }
    addCartToHTML();
    addCartToMemory();
};

cartListHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("plus") || positionClick.classList.contains("minus")) {
        let id = positionClick.parentElement.parentElement.dataset.id; // Change this to "dataset.id"
        let type = 'minus';
        if (positionClick.classList.contains("plus")) {
            type = 'plus';
        }
        changeQuantity(id, type);
    }
});


const changeQuantity = (id, type) => {
    console.log("changeQuantity function is executing"); // Add this line
    console.log("Product ID: ", id); // Add this line
    console.log("Type: ", type);
    let positionOfProductInCart = cartArray.findIndex((value) => value.product_id == id);
    if (positionOfProductInCart >= 0) {
        switch (type) {
            case 'plus':
                cartArray[positionOfProductInCart].quantity = cartArray[positionOfProductInCart].quantity + 1;
                break;
            default:
                let newValue = cartArray[positionOfProductInCart].quantity - 1;
                if (newValue > 0) {
                    cartArray[positionOfProductInCart].quantity = newValue;
                } else {
                    cartArray.splice(positionOfProductInCart, 1);
                }
        }
    }
    addCartToMemory();
    addCartToHTML();
    console.log("clicked5")
};


const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cartArray))
};

const getCartFromMemory = () => {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
        cartArray = JSON.parse(cartString);
    }
};

const addCartToHTML = () => {
    cartListHTML.innerHTML = '';
    let totalItemsInCart = 0;
    if (cartArray.length > 0) {
        cartArray.forEach(cartProduct => {
            totalItemsInCart += cartProduct.quantity;
            let newProduct = document.createElement("div");
            newProduct.classList.add("cartItem");
            newProduct.dataset.id = cartProduct.product_id;
            let positionInProducts = productArray.findIndex((value) => value.product_id == cartProduct.product_id);
            let productData = productArray[positionInProducts];
            newProduct.innerHTML = `<div class="image">
            <img src="images/verse-logo-vdrop_mercury.svg" class="placeholder" alt="Cart Image">
          </div>
          <div class="name">
            ${productData.name}
          </div>
          <div class="totalPrice">
            $${(productData.price) * (cartProduct.quantity)}
          </div>
          <div class="quantity">
            <span class="minus">&lt;</span>
            <span>${cartProduct.quantity}</span>
            <span class="plus">&gt;</span>
          </div>
          <div class="checkOut">
          </div>`;
            cartListHTML.appendChild(newProduct);
        })
    }
    cartCounter.innerHTML = totalItemsInCart;
};

const initialize = () => {
    fetch(mercuryFile)
        .then(response => response.json())
        .then(data => {
            productArray = data.products;
            console.log(productArray);
            addDataToHTML();
        })
        .catch(error => {
            console.error(error);
        });

    if (localStorage.getItem('cart')) {
        setTimeout(() => {
            cartArray = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }, 500); // Change the delay time (in milliseconds) as needed
    }

};

initialize();
