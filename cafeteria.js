// Variables globales
let cart = [];
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const finalizePurchaseBtn = document.getElementById('finalize-purchase');
const closeCartBtn = document.querySelector('.close-cart');

// Añadir producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        addToCart(name, price);
        renderCart();
    });
});

// Función para añadir producto al carrito
function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartTotal();
}

// Función para eliminar producto del carrito
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
    updateCartTotal();
}

// Función para actualizar el total del carrito
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Renderizar el carrito
function renderCart() {
    cartItemsList.innerHTML = ''; // Limpiar el carrito antes de agregar productos
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.addEventListener('click', () => removeFromCart(item.name));
        li.appendChild(removeBtn);
        
        cartItemsList.appendChild(li);
    });
}

// Vaciar el carrito
clearCartBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
    updateCartTotal();
});

// Cerrar el carrito al hacer clic en la "X"
closeCartBtn.addEventListener('click', () => {
    document.getElementById('carrito-checkbox').checked = false; // Oculta la ventana del carrito
});

// Finalizar compra
finalizePurchaseBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Gracias por tu compra!');
        cart = []; // Vacía el carrito después de la compra
        renderCart();
        updateCartTotal();
    } else {
        alert('Tu carrito está vacío.');
    }
});
