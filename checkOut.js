let cartArray = [];
let productArray = [];
const mercuryFile = "collection-files/Mercury.json";


function addCartToHTML() {
    // Clear cart data
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // If cart data is available
    if (cartArray) {
        cartArray.forEach(cartProduct => {
            if (cartProduct) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id = cartProduct.product_id;
                let positionInProducts = productArray.findIndex((value) => value.product_id == cartProduct.product_id);
                let productData = productArray[positionInProducts];
                newProduct.innerHTML =
                    `<img src="images/verse-logo-vdrop_mercury.svg">
                    <div class="info">
                        <div class="name">${productData.name}</div>
                        <div class="price">$${productData.price}/1 cartProduct</div>
                    </div>
                    <div class="quantity">${cartProduct.quantity}</div>
                    <div class="returnPrice">$${productData.price * cartProduct.quantity}</div>`;
                listCartHTML.appendChild(newProduct);
                totalQuantity += cartProduct.quantity;
                totalPrice += productData.price * cartProduct.quantity;
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}

const initialize = () => {
    fetch(mercuryFile)
        .then(response => response.json())
        .then(data => {
            productArray = data.products;
            console.log(productArray);
        })
        .catch(error => {
            console.error(error);
        });

    if (localStorage.getItem('cart')) {
        setTimeout(() => {
            cartArray = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }, 1000); // Change the delay time (in milliseconds) as needed
    }

};

initialize();