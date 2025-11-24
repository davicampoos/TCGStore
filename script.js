const products = [
    {
        id: 1, name: "Black Lotus", price: 200000.00,
        image: "imagens/lotus.jpg",
        fullImage: "imagens/lotus.jpg"
    },
    {
        id: 2, name: "Time Walk", price: 35000.00,
        image: "imagens/timewalk.jpg",
        fullImage: "imagens/timewalk.jpg"
    },
    {
        id: 3, name: "Chaos Orb", price: 1700.00,
        image: "imagens/orb.jpg",
        fullImage: "imagens/orb.jpg"
    },
    {
        id: 4, name: "Plains", price: 0.21,
        image: "imagens/plains.jpg",
        fullImage: "imagens/plains.jpg"
    },
    {
        id: 5, name: "Relâmpago", price: 9.90,
        image: "imagens/raio.jpg",
        fullImage: "imagens/raio.jpg"
    },
];

let cart = [];

const productListDiv = document.getElementById('product-list');
const cartItemsUl = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total-value');
const checkoutButton = document.getElementById('checkout-button');
const imagePreviewDiv = document.getElementById('image-preview');


function renderProducts() {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('product-grid');

    products.forEach(product => {
        const cardHtml = `
            <div class="card" data-id="${product.id}">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    title="${product.name}"
                    data-full-image="${product.fullImage}"
                    class="product-image"
                >
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        gridDiv.innerHTML += cardHtml;
    });

    productListDiv.appendChild(gridDiv);
}

function renderCart() {
    cartItemsUl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsUl.innerHTML = '<li class="cart-empty-message">Nenhum item no carrinho.</li>';
        cartTotalSpan.textContent = '0,00';
        return;
    }

    let total = 0;

    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    groupedCart.forEach(item => {
        const listItem = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        listItem.innerHTML = `
            <span>${item.quantity}x ${item.name}</span>
            <span>R$ ${itemTotal.toFixed(2).replace('.', ',')} 
                <button class="remove-item" data-id="${item.id}">X</button>
            </span>
        `;
        cartItemsUl.appendChild(listItem);
    });

    cartTotalSpan.textContent = total.toFixed(2).replace('.', ',');
}

function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        cart.push(product);
        renderCart();
        console.log(`${product.name} adicionado ao carrinho!`);
    }
}

function removeFromCart(productId) {
    const indexToRemove = cart.findIndex(item => item.id === parseInt(productId));
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        renderCart();
        console.log('Item removido do carrinho!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    productListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    cartItemsUl.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
        }
    });
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            const total = document.getElementById('cart-total-value').textContent;
            alert(`Compra Finalizada!\nTotal a pagar: R$ ${total}\nObrigado por comprar na TCG Store!`);
            cart = [];
            renderCart();
        } else {
            alert('Seu carrinho está vazio! Adicione algumas cartas antes de finalizar.');
        }
    });
    productListDiv.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.classList.contains('product-image')) {
            const fullImageUrl = target.getAttribute('data-full-image');
            const productName = target.getAttribute('alt');
            imagePreviewDiv.innerHTML = `<img src="${fullImageUrl}" alt="${productName}">`;
            imagePreviewDiv.style.display = 'block';
            setTimeout(() => {
                imagePreviewDiv.style.opacity = '1';
            }, 10);
        }
    });

    productListDiv.addEventListener('mousemove', (event) => {
        if (event.target.classList.contains('product-image')) {
            const previewWidth = 200;
            const offsetX = 15;
            const offsetY = 15;
            let newX = event.clientX + offsetX;
            if (newX + previewWidth > window.innerWidth) {
                newX = event.clientX - previewWidth - offsetX;
            }
            let newY = event.clientY + offsetY;
            if (newY + imagePreviewDiv.offsetHeight > window.innerHeight) {
                newY = event.clientY - imagePreviewDiv.offsetHeight - offsetY;
            }

            imagePreviewDiv.style.left = `${newX}px`;
            imagePreviewDiv.style.top = `${newY}px`;
        }
    });

    productListDiv.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (target.classList.contains('product-image')) {
            imagePreviewDiv.style.opacity = '0';
            setTimeout(() => {
                imagePreviewDiv.style.display = 'none';
                imagePreviewDiv.innerHTML = '';
            }, 200);
        }
    });
});

// "//" para adicionar comentario//
