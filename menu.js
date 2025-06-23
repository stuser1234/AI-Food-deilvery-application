document.addEventListener('DOMContentLoaded', async () => {
    // Initialize AI service
    await aiService.initialize('mock-api-key');

    // Get restaurant data from localStorage
    const restaurantData = JSON.parse(localStorage.getItem('selectedRestaurant'));
    if (!restaurantData) {
        window.location.href = 'restaurants.html';
        return;
    }

    // Update restaurant header
    document.querySelector('.restaurant-name').textContent = restaurantData.name;
    document.querySelector('.rating').textContent = restaurantData.rating;
    document.querySelector('.reviews').textContent = `${restaurantData.reviews}+ reviews`;
    document.querySelector('.cuisine').textContent = restaurantData.cuisine;
    document.querySelector('.delivery-time').textContent = restaurantData.deliveryTime;
    document.querySelector('.price-range').textContent = restaurantData.priceRange;

    // Get menu recommendations from AI
    const recommendations = await aiService.getMenuRecommendations(restaurantData.id, {
        userPreferences: {
            dietaryRestrictions: [],
            allergies: [],
            budget: 1000
        }
    });

    // Get all unique categories from menu items
    const categories = [...new Set(restaurantData.menu.map(item => item.category))];
    
    // Create category buttons
    const categoryButtons = document.querySelector('.category-buttons');
    categoryButtons.innerHTML = `
        <button class="category-btn active" data-category="all">All</button>
        ${categories.map(category => `
            <button class="category-btn" data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('')}
    `;

    // Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter menu items
            filterMenuItems(button.dataset.category);
        });
    });

    // Function to filter menu items by category
    function filterMenuItems(category) {
        const menuItems = document.querySelector('.menu-items');
        menuItems.innerHTML = '';

        const filteredItems = category === 'all' 
            ? restaurantData.menu 
            : restaurantData.menu.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">₹${item.price}</div>
                    <button class="add-to-cart-btn" data-item-id="${item.id}">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            menuItems.appendChild(menuItem);
        });

        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.dataset.itemId);
                const item = restaurantData.menu.find(item => item.id === itemId);
                addToCart(item);
            });
        });
    }

    // Function to add item to cart
    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...item,
                quantity: 1,
                restaurantId: restaurantData.id,
                restaurantName: restaurantData.name
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${item.name} added to cart!`);
    }

    // Function to update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initial display
    filterMenuItems('all');
    updateCartCount();
}); 