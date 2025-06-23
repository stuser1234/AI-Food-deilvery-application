document.addEventListener('DOMContentLoaded', async () => {
    // Initialize AI service
    await aiService.initialize();

    // Generate random order number
    const orderNumber = Math.floor(Math.random() * 90000) + 10000;
    document.querySelector('.order-number').textContent = `Order #${orderNumber}`;

    // Get order tracking information
    const orderTracking = await aiService.trackOrder(orderNumber);
    
    // Update tracking steps
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function updateTracking() {
        if (currentStep < steps.length) {
            steps.forEach((step, index) => {
                if (index <= currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            currentStep++;
        }
    }

    // Add AI insights to tracking
    const trackingSection = document.querySelector('.tracking-section');
    const insightsContainer = document.createElement('div');
    insightsContainer.className = 'tracking-insights';
    trackingSection.appendChild(insightsContainer);

    function updateInsights() {
        insightsContainer.innerHTML = orderTracking.status.insights
            .map(insight => `
                <div class="insight-item">
                    <i class="fas fa-info-circle"></i>
                    <span>${insight}</span>
                </div>
            `).join('');
    }

    // Update tracking every 30 seconds
    setInterval(() => {
        updateTracking();
        updateInsights();
    }, 30000);

    // Track Order button functionality
    const trackOrderBtn = document.querySelector('.track-order-btn');
    trackOrderBtn.addEventListener('click', () => {
        aiService.showNotification(`Tracking your order #${orderNumber}...`);
        // In a real app, this would open a tracking page or modal
    });

    // Back to Home button functionality
    const backToHomeBtn = document.querySelector('.back-to-home-btn');
    backToHomeBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Initial display
    updateTracking();
    updateInsights();
}); 