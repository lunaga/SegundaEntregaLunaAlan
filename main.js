document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { id: 1, title: "BloodBorne", price: 59.99, image: "./img/blood.jpg" },
        { id: 2, title: "Dark Souls 3", price: 49.99, image: "./img/ds3.jpg" },
        { id: 3, title: "Assassins Creed", price: 39.99, image: "./img/assassins.jpg" },
        { id: 4, title: "Elden Ring", price: 69.99, image: "./img/eldenring.jpg" },
        { id: 5, title: "God Of War", price: 69.99, image: "./img/godofwar.jpg" },
        { id: 6, title: "Mortal Kombat 11", price: 69.99, image: "./img/mk11.jpg" },
        { id: 7, title: "Sekiro", price: 59.99, image: "./img/sekiro.jpg" },
        { id: 8, title: "Sifu", price: 39.99, image: "./img/sifu.jpg" },
        { id: 9, title: "Spiderman", price: 39.99, image: "./img/spiderman.jpg" },
        { id: 10, title: "Tomb Raider", price: 39.99, image: "./img/tomb.jpg" },
    ];

    let cart = [];

    const gameGrid = document.getElementById('gameGrid');
    const cartToggle = document.getElementById('cartToggle');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalPrice = document.getElementById('totalPrice');
    const cartCount = document.getElementById('cartCount');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    function renderGames() {
        gameGrid.innerHTML = games.map(game => `
            <div class="game-card">
                <img src="${game.image}" alt="${game.title}">
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-price">$${game.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${game.id}">
                        <i data-lucide="trophy"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        `).join('');

        lucide.createIcons();

        gameGrid.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const gameId = parseInt(button.getAttribute('data-id'));
                addToCart(games.find(game => game.id === gameId));
            });
        });
    }

    function addToCart(game) {
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...game, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(gameId) {
        cart = cart.filter(item => item.id !== gameId);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = cart.length === 0 ? '<p>Tu carrito está vacío</p>' : cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
            </div>
        `).join('');

        const totalPriceValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPrice.textContent = totalPriceValue.toFixed(2);
        cartTotal.style.display = cart.length > 0 ? 'block' : 'none';
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        cartItems.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const gameId = parseInt(button.getAttribute('data-id'));
                removeFromCart(gameId);
            });
        });
    }

    cartToggle.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    renderGames();
    updateCart();
    lucide.createIcons();
});

