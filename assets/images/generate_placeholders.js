const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
    'assets/images/hero',
    'assets/images/categories',
    'assets/images/restaurants'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Function to generate a placeholder image
function generatePlaceholder(width, height, text, filename) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = '#666';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filename, buffer);
}

// Generate hero background images
generatePlaceholder(1920, 1080, 'Hero Background 1', 'assets/images/hero/food-bg-1.jpg');
generatePlaceholder(1920, 1080, 'Hero Background 2', 'assets/images/hero/food-bg-2.jpg');
generatePlaceholder(1920, 1080, 'Hero Background 3', 'assets/images/hero/food-bg-3.jpg');

// Generate category images
generatePlaceholder(400, 300, 'Pizza', 'assets/images/categories/pizza.jpg');
generatePlaceholder(400, 300, 'Burger', 'assets/images/categories/burger.jpg');
generatePlaceholder(400, 300, 'Sushi', 'assets/images/categories/sushi.jpg');
generatePlaceholder(400, 300, 'Dessert', 'assets/images/categories/dessert.jpg');

// Generate restaurant images
generatePlaceholder(400, 300, 'Pizza Palace', 'assets/images/restaurants/pizza-palace.jpg');
generatePlaceholder(400, 300, 'Burger King', 'assets/images/restaurants/burger-king.jpg');
generatePlaceholder(400, 300, 'Sushi Master', 'assets/images/restaurants/sushi-master.jpg');

console.log('Placeholder images generated successfully!'); 