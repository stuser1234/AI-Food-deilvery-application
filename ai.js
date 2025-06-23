// AI Service with Dialog and 3D Features
const aiService = {
    initialized: false,
    userPreferences: null,
    currentFeature: null,
    isDialogOpen: false,
    moodSuggestions: {
        energetic: ['Protein-rich smoothie', 'Grilled chicken salad', 'Energy bars'],
        happy: ['Pizza', 'Ice cream', 'Chocolate cake'],
        relaxed: ['Herbal tea', 'Comfort soup', 'Warm pasta']
    },
    
    // Feature Examples
    featureExamples: {
        taste: [
            { title: 'Spicy Lover', description: 'Recommended: Thai Green Curry, Sichuan Hot Pot' },
            { title: 'Healthy Eater', description: 'Recommended: Mediterranean Bowl, Quinoa Salad' },
            { title: 'Comfort Food', description: 'Recommended: Mac & Cheese, Chicken Pot Pie' }
        ],
        nutrition: [
            { title: 'Protein Focus', description: 'High protein meals with balanced macros' },
            { title: 'Low Carb', description: 'Keto-friendly options with healthy fats' },
            { title: 'Balanced Diet', description: 'Meals with optimal macro distribution' }
        ],
        mood: [
            { title: 'Happy', description: 'Comfort food and sweet treats' },
            { title: 'Energetic', description: 'Protein-rich meals and energizing snacks' },
            { title: 'Relaxed', description: 'Light, calming dishes and herbal teas' }
        ],
        visualization: [
            { title: '3D Dish Preview', description: 'Interactive 3D model of your selected dish' },
            { title: 'Customization', description: 'See how your customizations affect the dish' },
            { title: 'Presentation', description: 'View the final plating and presentation' }
        ],
        chef: [
            { title: 'Cooking Tips', description: 'Professional cooking techniques and tips' },
            { title: 'Recipe Mods', description: 'Customize recipes to your preferences' },
            { title: 'Food Pairing', description: 'Perfect combinations for your meal' }
        ],
        pairing: [
            { title: 'Wine Pairing', description: 'Perfect wine matches for your dish' },
            { title: 'Side Dishes', description: 'Complementary sides and appetizers' },
            { title: 'Dessert Pairing', description: 'Sweet endings that complement your meal' }
        ]
    },

    async initialize(apiKey = 'mock-api-key') {
        this.initialized = true;
        console.log('AI Service initialized with key:', apiKey);
        return true;
    },

    // Feature Descriptions
    featureDescriptions: {
        taste: {
            title: 'Smart Taste AI',
            description: 'Get personalized food recommendations based on your taste preferences and ordering history.',
            demo: 'Try our taste profile generator to start receiving personalized recommendations.',
            icon: "brain"
        },
        nutrition: {
            title: 'NutriAI Insights',
            description: 'Track your nutrition and get AI-powered insights about your food choices.',
            demo: 'Analyze your recent orders for nutritional insights.',
            icon: "chart-pie"
        },
        mood: {
            title: 'MoodFood AI',
            description: 'Let AI suggest the perfect food based on your current mood.',
            demo: 'Tell us your mood and we\'ll recommend the perfect meal.',
            icon: "smile"
        },
        visualization: {
            title: '3D Food Preview',
            description: 'See your food in stunning 3D before ordering.',
            demo: 'Interact with 3D models of popular dishes.',
            icon: "cube"
        },
        chef: {
            title: 'ChefGPT Assistant',
            description: 'Get cooking tips, recipe modifications, and food pairing suggestions from our AI chef.',
            demo: 'Ask ChefGPT anything about cooking and food.',
            icon: "robot"
        },
        pairing: {
            title: 'Food Pairing AI',
            description: 'Discover perfect food combinations and complementary dishes.',
            demo: 'Find the best combinations for your favorite foods.',
            icon: "wine-glass-alt"
        }
    },

    // Dialog Management
    openDialog(feature) {
        this.currentFeature = feature;
        this.isDialogOpen = true;
        const dialog = document.getElementById('aiDialog');
        const title = document.getElementById('dialogTitle');
        const description = document.getElementById('featureDescription');
        const icon = document.getElementById('featureIcon');
        const visualization = document.getElementById('featureVisualization');
        const examplesContainer = document.querySelector('.examples-container');        
        const featureData = this.featureDescriptions[feature];
        title.textContent = featureData.title;
        description.textContent = featureData.description;
        icon.className = `fas fa-${featureData.icon}`;
        
        // Clear previous content
        visualization.innerHTML = '';
        examplesContainer.innerHTML = '';
        
        // Add feature-specific visualization
        this.addFeatureVisualization(feature, visualization);
        
        // Add examples
        this.featureExamples[feature].forEach(example => {
            const exampleItem = document.createElement('div');
            exampleItem.className = 'example-item';
            exampleItem.innerHTML = `
                <h4>${example.title}</h4>
                <p>${example.description}</p>
            `;
            examplesContainer.appendChild(exampleItem);
        });
        
        // Show dialog and trigger animation
        dialog.style.display = 'flex';
        setTimeout(() => {
            dialog.classList.add('active');
        }, 10); 
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    },

    addFeatureVisualization(feature, container) {
        const visualizations = {
            taste: () => {
                container.innerHTML = `
                    <div class="taste-visualization">
                        <div class="taste-wheel">
                            <div class="wheel-segment spicy"></div>
                            <div class="wheel-segment sweet"></div>
                            <div class="wheel-segment savory"></div>
                            <div class="wheel-segment bitter"></div>
                        </div>
                        <p>Your Taste Profile</p>
                    </div>
                `;
            },
            nutrition: () => {
                container.innerHTML = `
                    <div class="nutrition-chart">
                        <div class="chart-bar protein"></div>
                        <div class="chart-bar carbs"></div>
                        <div class="chart-bar fats"></div>
                    </div>
                `;
            },
            mood: () => {
                container.innerHTML = `
                    <div class="mood-visualization">
                        <div class="mood-emoji">😊</div>
                        <p>Current Mood</p>
                    </div>
                `;
            },
            visualization: () => {
                container.innerHTML = `
                    <div class="3d-preview">
                        <i class="fas fa-cube"></i>
                        <p>3D Food Preview</p>
                    </div>
                `;
            },
            chef: () => {
                container.innerHTML = `
                    <div class="chef-assistant">
                        <i class="fas fa-robot"></i>
                        <p>ChefGPT Assistant</p>
                    </div>
                `;
            },
            pairing: () => {
                container.innerHTML = `
                    <div class="pairing-visualization">
                        <div class="food-pair">
                            <div class="main-dish"></div>
                            <div class="pairing-item"></div>
                        </div>
                        <p>Perfect Pairings</p>
                    </div>
                `;
            }
        };
        
        visualizations[feature]();
    },

    closeDialog() {
        if (!this.isDialogOpen) return;
        
        const dialog = document.getElementById('aiDialog');
        dialog.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            dialog.style.display = 'none';
            this.currentFeature = null;
            this.isDialogOpen = false;
            // Restore body scrolling
            document.body.style.overflow = '';
        }, 300);
    },

    // 3D Visualization
    initialize3DVisualization() {
        const container = document.getElementById('foodModel');
        // Mock 3D visualization setup
        container.innerHTML = `
            <div class="3d-placeholder">
                <i class="fas fa-cube"></i>
                <p>3D Food Model Loading...</p>
            </div>
        `;
    },

    // Feature Actions
    async tryFeature() {
        const feature = this.currentFeature;
        if (!feature) return;

        switch (feature) {
            case 'taste':
                await this.generateTasteProfile();
                break;
            case 'nutrition':
                await this.analyzeNutrition();
                break;
            case 'mood':
                await this.getMoodRecommendations('happy');
                break;
            case 'visualization':
                this.initialize3DVisualization();
                break;
            case 'chef':
                await this.getAssistantResponse('recommend');
                break;
            case 'pairing':
                await this.getFoodPairings();
                break;
        }
    },

    // Existing methods
    async generateTasteProfile() {
        const profiles = [
            'You seem to enjoy spicy Asian cuisine with a preference for healthy options.',
            'Your taste profile indicates a love for Italian dishes with a sweet tooth.',
            'Based on your history, you prefer fresh, Mediterranean-style meals.'
        ];
        await this.simulateDelay();
        return profiles[Math.floor(Math.random() * profiles.length)];
    },

    async analyzeNutrition() {
        await this.simulateDelay();
        return {
            protein: Math.random() * 100,
            carbs: Math.random() * 100,
            fats: Math.random() * 100
        };
    },

    async getMoodRecommendations(mood) {
        await this.simulateDelay();
        return this.moodSuggestions[mood] || [];
    },

    async getAssistantResponse(type) {
        await this.simulateDelay();
        const responses = {
            recommend: "Based on your preferences, I'd recommend trying our new Thai Green Curry!",
            diet: "For a balanced diet, try incorporating more leafy greens and lean proteins.",
            pair: "This dish pairs well with a fresh garden salad and sparkling water."
        };
        return responses[type] || "How can I help you with your food choices today?";
    },

    async getFoodPairings() {
        await this.simulateDelay();
        return {
            main: "Grilled Salmon",
            sides: ["Roasted Vegetables", "Wild Rice"],
            drink: "Sauvignon Blanc",
            dessert: "Lemon Tart"
        };
    },

    async simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
};

// AI Feature Functions
async function generateTasteProfile() {
    const tasteAiText = document.getElementById('tasteAiText');
    tasteAiText.textContent = 'Analyzing your taste profile...';
    
    try {
        const profile = await aiService.generateTasteProfile();
        tasteAiText.textContent = profile;
    } catch (error) {
        tasteAiText.textContent = 'Error generating taste profile';
    }
}

async function analyzeNutrition() {
    const nutritionChart = document.getElementById('nutritionChart');
    const bars = nutritionChart.querySelectorAll('.chart-bar');
    
    // Reset heights
    bars.forEach(bar => bar.style.height = '0%');
    
    try {
        const nutrition = await aiService.analyzeNutrition();
        
        // Animate bars
        bars[0].style.height = `${nutrition.protein}%`;
        bars[1].style.height = `${nutrition.carbs}%`;
        bars[2].style.height = `${nutrition.fats}%`;
    } catch (error) {
        console.error('Error analyzing nutrition:', error);
    }
}

async function selectMood(mood) {
    const moodSuggestion = document.getElementById('moodSuggestion');
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    // Update active state
    moodButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mood === mood) {
            btn.classList.add('active');
        }
    });
    
    moodSuggestion.textContent = 'Analyzing your mood...';
    
    try {
        const suggestions = await aiService.getMoodRecommendations(mood);
        moodSuggestion.textContent = `Recommended: ${suggestions.join(', ')}`;
    } catch (error) {
        moodSuggestion.textContent = 'Error getting recommendations';
    }
}

async function askAssistant(type) {
    const chatPreview = document.getElementById('chatPreview');
    const messageDiv = chatPreview.querySelector('.chat-message');
    
    messageDiv.textContent = 'Thinking...';
    
    try {
        const response = await aiService.getAssistantResponse(type);
        messageDiv.textContent = response;
    } catch (error) {
        messageDiv.textContent = 'Error getting response';
    }
}

// Initialize AI service when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await aiService.initialize();
    } catch (error) {
        console.error('Error initializing AI service:', error);
    }
});

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Feature card click handlers
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.dataset.feature;
            aiService.openDialog(feature);
        });
    });

    // Dialog close button
    const closeButton = document.getElementById('closeDialog');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aiService.closeDialog();
        });
    }

    // Close dialog when clicking outside
    const dialog = document.getElementById('aiDialog');
    if (dialog) {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                aiService.closeDialog();
            }
        });
    }

    // Try Feature button
    const tryButton = document.getElementById('tryFeature');
    if (tryButton) {
        tryButton.addEventListener('click', () => {
            aiService.tryFeature();
        });
    }

    // Learn More button
    const learnMoreButton = document.getElementById('learnMore');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', () => {
            const feature = aiService.currentFeature;
            if (feature) {
                window.open(`https://example.com/features/${feature}`, '_blank');
            }
        });
    }

    // Close dialog on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiService.isDialogOpen) {
            aiService.closeDialog();
        }
    });
});

// Export the service
window.aiService = aiService; 