// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchForm = document.querySelector('.search-container');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input');
            const query = searchInput.value.trim();
            if (query) {
                // Redirect to restaurants page with search query
                window.location.href = `pages/restaurants.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Restaurant card hover effects
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Login/Signup button handlers
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showNotification('Login feature coming soon!');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            showNotification('Signup feature coming soon!');
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        gsap.fromTo(notification,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
        
        setTimeout(() => {
            gsap.to(notification, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 3000);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            gsap.to(hero, {
                y: scrolled * 0.5,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Add loading animation to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });
    
    // Loading animation
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => loadingScreen.remove()
            });
        }
    });
    
    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
            this.alt = 'Image not available';
        });
    });
    
    // Image Loading Optimization
    optimizeImageLoading();
    preloadNextImage();
    setInterval(changeBackgroundImage, 5000);
});

// Background Image Transitions
const backgroundImages = document.querySelectorAll('.bg-image');
let currentImageIndex = 0;

function preloadNextImage() {
    const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
    const nextImage = backgroundImages[nextIndex];
    const img = new Image();
    img.src = nextImage.src;
}

function changeBackgroundImage() {
    backgroundImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    backgroundImages[currentImageIndex].classList.add('active');
    preloadNextImage();
}

// Image Loading Optimization
function optimizeImageLoading() {
    // Preload first background image
    const firstBgImage = document.querySelector('.bg-image.active');
    if (firstBgImage) {
        firstBgImage.onload = () => {
            document.querySelector('.loading-screen').style.opacity = '0';
        };
    }

    // Lazy load other images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}
