document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    
    // Initialize AI service
    await aiService.initialize('mock-api-key');
    console.log('AI Service Initialized');

    // Get dialog elements
    const cuisineDialog = document.getElementById('cuisineDialog');
    const dialogTitle = document.getElementById('dialogTitle');
    const cuisineItems = document.getElementById('cuisineItems');
    const closeDialog = document.getElementById('closeDialog');

    console.log('Dialog Elements:', {
        cuisineDialog: !!cuisineDialog,
        dialogTitle: !!dialogTitle,
        cuisineItems: !!cuisineItems,
        closeDialog: !!closeDialog
    });

    // Add click event to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    console.log('Found category cards:', categoryCards.length);
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Category card clicked');
            const cuisineName = card.querySelector('h3').textContent;
            console.log('Selected cuisine:', cuisineName);
            showCuisineItems(cuisineName);
        });
    });

    // Close dialog when clicking the close button
    closeDialog.addEventListener('click', () => {
        console.log('Close dialog clicked');
        cuisineDialog.classList.remove('active');
    });

    // Close dialog when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cuisineDialog) {
            console.log('Clicked outside dialog');
            cuisineDialog.classList.remove('active');
        }
    });

    // Function to show cuisine items
    async function showCuisineItems(cuisine) {
        try {
            console.log('Showing cuisine items for:', cuisine);
            
            // Get restaurants for this cuisine
            const restaurants = [
                {
                    id: 1,
                    name: "Pizza Palace",
                    cuisine: "Italian",
                    menu: [
                        { name: "Margherita Pizza", price: 299, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
                        { name: "Pepperoni Pizza", price: 399, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
                        { name: "Garlic Bread", price: 149, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 2,
                    name: "Burger King",
                    cuisine: "American",
                    menu: [
                        { name: "Cheeseburger", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
                        { name: "Chicken Burger", price: 249, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
                        { name: "French Fries", price: 99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 3,
                    name: "Spice Garden",
                    cuisine: "Indian",
                    menu: [
                        { name: "Butter Chicken", price: 349, image: "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=400&h=300&fit=crop" },
                        { name: "Vegetable Biryani", price: 299, image: "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=400&h=300&fit=crop" },
                        { name: "Garlic Naan", price: 49, image: "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 4,
                    name: "Sushi Master",
                    cuisine: "Japanese",
                    menu: [
                        { name: "California Roll", price: 399, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
                        { name: "Salmon Nigiri", price: 449, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
                        { name: "Miso Soup", price: 149, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 5,
                    name: "Thai Spice",
                    cuisine: "Thai",
                    menu: [
                        { name: "Pad Thai", price: 299, image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop" },
                        { name: "Green Curry", price: 349, image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop" },
                        { name: "Spring Rolls", price: 199, image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 6,
                    name: "Taco Fiesta",
                    cuisine: "Mexican",
                    menu: [
                        { name: "Beef Tacos", price: 249, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop" },
                        { name: "Vegetable Quesadilla", price: 199, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop" },
                        { name: "Guacamole", price: 149, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 7,
                    name: "Noodle House",
                    cuisine: "Chinese",
                    menu: [
                        { name: "Chicken Noodles", price: 299, image: "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=400&h=300&fit=crop" },
                        { name: "Vegetable Spring Rolls", price: 199, image: "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=400&h=300&fit=crop" },
                        { name: "Hot & Sour Soup", price: 149, image: "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 8,
                    name: "Mediterranean Delight",
                    cuisine: "Mediterranean",
                    menu: [
                        { name: "Chicken Shawarma", price: 299, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop" },
                        { name: "Falafel Plate", price: 249, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop" },
                        { name: "Baba Ganoush", price: 199, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop" }
                    ]
                }
            ];

            // Filter restaurants by cuisine
            const filteredRestaurants = restaurants.filter(r => r.cuisine === cuisine);
            console.log('Filtered restaurants:', filteredRestaurants.length);
            
            if (filteredRestaurants.length === 0) {
                showNotification('No items found for this cuisine');
                return;
            }

            // Clear previous items
            cuisineItems.innerHTML = '';
            
            // Set dialog title
            dialogTitle.textContent = `${cuisine} Cuisine Items`;

            // Add items from all restaurants of this cuisine
            filteredRestaurants.forEach(restaurant => {
                restaurant.menu.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cuisine-item';
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="cuisine-item-info">
                            <h3>${item.name}</h3>
                            <p>From ${restaurant.name}</p>
                            <div class="cuisine-item-price">₹${item.price}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease">-</button>
                                <span class="quantity-display">1</span>
                                <button class="quantity-btn increase">+</button>
                            </div>
                            <button class="add-to-cart-btn" data-item='${JSON.stringify({...item, restaurant: restaurant.name})}'>
                                Add to Cart
                            </button>
                        </div>
                    `;

                    // Add quantity control event listeners
                    const quantityBtns = itemElement.querySelectorAll('.quantity-btn');
                    const quantityDisplay = itemElement.querySelector('.quantity-display');
                    
                    quantityBtns.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            let quantity = parseInt(quantityDisplay.textContent);
                            
                            if (btn.classList.contains('decrease')) {
                                if (quantity > 1) {
                                    quantity--;
                                }
                            } else {
                                quantity++;
                            }
                            
                            quantityDisplay.textContent = quantity;
                        });
                    });

                    // Add to cart event listener
                    const addToCartBtn = itemElement.querySelector('.add-to-cart-btn');
                    addToCartBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const itemData = JSON.parse(addToCartBtn.dataset.item);
                        const quantity = parseInt(quantityDisplay.textContent);
                        addToCart(itemData, quantity);
                        showNotification(`${quantity} ${itemData.name} added to cart!`);
                    });

                    cuisineItems.appendChild(itemElement);
                });
            });

            // Show dialog
            console.log('Showing dialog');
            cuisineDialog.classList.add('active');
            
            // Update cart count
            updateCartCount();

        } catch (error) {
            console.error('Error showing cuisine items:', error);
            showNotification('Error loading cuisine items');
        }
    }

    // Function to add item to cart
    function addToCart(item, quantity) {
        try {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(i => i.name === item.name && i.restaurant === item.restaurant);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...item,
                    quantity: quantity
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        } catch (error) {
            console.error('Error adding to cart:', error);
            showNotification('Error adding item to cart');
        }
    }

    // Function to update cart count
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'block' : 'none';
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after animation
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize cart count
    updateCartCount();
    
    console.log('Initialization complete');
}); 