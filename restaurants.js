document.addEventListener('DOMContentLoaded', async () => {
    // Initialize AI service
    await aiService.initialize('mock-api-key');

    // Restaurant data
    const restaurants = [
        {
            id: 1,
            name: "Pizza Palace",
            rating: 4.5,
            reviews: 1200,
            cuisine: "Italian",
            deliveryTime: "30-45 min",
            priceRange: "₹₹",
            image: "../images/pizza-palace.jpg",
            menu: [
                {
                    id: 1,
                    name: "Margherita Pizza",
                    description: "Classic tomato sauce, mozzarella, and basil",
                    price: 299,
                    image: "../images/margherita-pizza.jpg",
                    category: "pizza"
                },
                {
                    id: 2,
                    name: "Pepperoni Pizza",
                    description: "Tomato sauce, mozzarella, and pepperoni",
                    price: 349,
                    image: "../images/pepperoni-pizza.jpg",
                    category: "pizza"
                },
                {
                    id: 3,
                    name: "Garlic Bread",
                    description: "Freshly baked bread with garlic butter",
                    price: 149,
                    image: "../images/garlic-bread.jpg",
                    category: "sides"
                }
            ]
        },
        {
            id: 2,
            name: "Burger King",
            rating: 4.3,
            reviews: 950,
            cuisine: "American",
            deliveryTime: "25-35 min",
            priceRange: "₹₹",
            image: "../images/burger-king.jpg",
            menu: [
                {
                    id: 4,
                    name: "Cheeseburger",
                    description: "Beef patty with cheese, lettuce, and special sauce",
                    price: 199,
                    image: "../images/cheeseburger.jpg",
                    category: "burgers"
                },
                {
                    id: 5,
                    name: "Chicken Burger",
                    description: "Crispy chicken patty with mayo and lettuce",
                    price: 179,
                    image: "../images/chicken-burger.jpg",
                    category: "burgers"
                },
                {
                    id: 6,
                    name: "French Fries",
                    description: "Crispy golden fries with seasoning",
                    price: 99,
                    image: "../images/french-fries.jpg",
                    category: "sides"
                }
            ]
        },
        {
            id: 3,
            name: "Spice Garden",
            rating: 4.7,
            reviews: 1500,
            cuisine: "Indian",
            deliveryTime: "35-45 min",
            priceRange: "₹₹₹",
            image: "../images/spice-garden.jpg",
            menu: [
                {
                    id: 7,
                    name: "Butter Chicken",
                    description: "Tender chicken in rich tomato gravy",
                    price: 399,
                    image: "../images/butter-chicken.jpg",
                    category: "mains"
                },
                {
                    id: 8,
                    name: "Vegetable Biryani",
                    description: "Fragrant rice with mixed vegetables",
                    price: 299,
                    image: "../images/veg-biryani.jpg",
                    category: "mains"
                },
                {
                    id: 9,
                    name: "Garlic Naan",
                    description: "Freshly baked bread with garlic",
                    price: 99,
                    image: "../images/garlic-naan.jpg",
                    category: "breads"
                }
            ]
        },
        {
            id: 4,
            name: "Sushi Master",
            rating: 4.6,
            reviews: 800,
            cuisine: "Japanese",
            name: 'Burger King',
            rating: 4.2,
            reviews: 95,
            cuisine: 'American',
            deliveryTime: '20-30 min',
            priceRange: '$',
            image: '../images/burger-king.jpg',
            menu: [
                { id: 4, name: 'Cheeseburger', price: 8.99, description: 'Classic beef patty with cheese' },
                { id: 5, name: 'Bacon King', price: 10.99, description: 'Double patty with bacon' },
                { id: 6, name: 'Veggie Burger', price: 9.99, description: 'Plant-based patty with vegetables' }
            ]
        }
    ];

    // Get all unique cuisines
    const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisine))];
    
    // Create cuisine filter buttons
    const cuisineFilters = document.querySelector('.cuisine-filters');
    cuisineFilters.innerHTML = `
        <button class="filter-btn active" data-cuisine="all">All</button>
        ${cuisines.map(cuisine => `
            <button class="filter-btn" data-cuisine="${cuisine.toLowerCase()}">
                ${cuisine}
            </button>
        `).join('')}
    `;

    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter restaurants
            filterRestaurants(button.dataset.cuisine);
        });
    });

    // Function to filter restaurants by cuisine
    function filterRestaurants(cuisine) {
        const restaurantGrid = document.querySelector('.restaurant-grid');
        restaurantGrid.innerHTML = '';

        const filteredRestaurants = cuisine === 'all' 
            ? restaurants 
            : restaurants.filter(restaurant => restaurant.cuisine.toLowerCase() === cuisine);

        filteredRestaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.className = 'restaurant-card';
            restaurantCard.innerHTML = `
                <div class="restaurant-image">
                    <img src="${restaurant.image}" alt="${restaurant.name}" loading="lazy">
                </div>
                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <div class="restaurant-details">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${restaurant.rating}</span>
                            <span>(${restaurant.reviews}+ reviews)</span>
                        </div>
                        <div class="cuisine">${restaurant.cuisine}</div>
                        <div class="delivery-time">${restaurant.deliveryTime}</div>
                        <div class="price-range">${restaurant.priceRange}</div>
                    </div>
                    <button class="view-menu-btn" data-restaurant-id="${restaurant.id}">
                        View Menu
                    </button>
                </div>
            `;
            restaurantGrid.appendChild(restaurantCard);
        });

        // Add event listeners to View Menu buttons
        document.querySelectorAll('.view-menu-btn').forEach(button => {
            button.addEventListener('click', () => {
                const restaurantId = parseInt(button.dataset.restaurantId);
                const restaurant = restaurants.find(r => r.id === restaurantId);
                if (restaurant) {
                    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
                    window.location.href = '../pages/menu.html';
                }
            });
        });
    }

    // Initial display
    filterRestaurants('all');
}); 