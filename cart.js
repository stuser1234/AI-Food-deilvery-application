document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsList = document.querySelector('.items-list');
    const orderSummary = document.querySelector('.summary-details');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Display cart items
    function displayCartItems() {
        itemsList.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="../images/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.restaurant}</p>
                    <div class="item-options">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-item-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-item-id="${item.id}">+</button>
                        </div>
                        <div class="item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="remove-btn" data-item-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            itemsList.appendChild(cartItem);
            
            subtotal += item.price * item.quantity;
        });
        
        // Update order summary
        const deliveryFee = 49; // ₹49 delivery fee
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + deliveryFee + tax;
        
        orderSummary.innerHTML = `
            <div class="summary-row">
                <span>Subtotal</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee</span>
                <span>₹${deliveryFee.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>GST (18%)</span>
                <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
        `;
        
        // Add event listeners
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = parseInt(btn.dataset.itemId);
                const item = cart.find(i => i.id === itemId);
                
                if (btn.classList.contains('minus')) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cart.splice(cart.indexOf(item), 1);
                    }
                } else if (btn.classList.contains('plus')) {
                    item.quantity++;
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartCount();
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = parseInt(btn.dataset.itemId);
                const itemIndex = cart.findIndex(i => i.id === itemId);
                cart.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartCount();
            });
        });
    }
    
    // Update cart count in navigation
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
    
    // Promo code functionality
    const promoInput = document.querySelector('.promo-section input');
    const applyPromoBtn = document.querySelector('.apply-promo-btn');
    
    const validPromoCodes = {
        'WELCOME50': 0.5,
        'FREESHIP': 49,
        'FESTIVE30': 0.3
    };
    
    let activePromo = null;
    
    applyPromoBtn.addEventListener('click', () => {
        const promoCode = promoInput.value.toUpperCase();
        if (validPromoCodes[promoCode]) {
            activePromo = promoCode;
            showNotification('Promo code applied successfully!');
            displayCartItems(); // Recalculate with promo
        } else {
            showNotification('Invalid promo code');
        }
    });
    
    // Delivery option functionality
    const deliveryOptions = document.querySelectorAll('.option input[type="radio"]');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            displayCartItems(); // Recalculate with new delivery option
        });
    });
    
    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        // In a real app, this would redirect to a payment page
        showNotification('Proceeding to checkout...');
        setTimeout(() => {
            localStorage.removeItem('cart');
            window.location.href = 'order-confirmation.html';
        }, 2000);
    });
    
    // Notification function
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
    displayCartItems();
    updateCartCount();
}); 