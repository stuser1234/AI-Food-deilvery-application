#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download restaurant images
curl -o images/pizza-palace.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
curl -o images/burger-king.jpg "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
curl -o images/spice-garden.jpg "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=800&h=600&fit=crop"
curl -o images/sushi-master.jpg "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
curl -o images/noodle-house.jpg "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=800&h=600&fit=crop"
curl -o images/taco-fiesta.jpg "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&h=600&fit=crop"
curl -o images/mediterranean-delight.jpg "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
curl -o images/thai-spice.jpg "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=600&fit=crop"

# Download cuisine category images
curl -o images/indian-cuisine.jpg "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=800&h=600&fit=crop"
curl -o images/chinese-cuisine.jpg "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=800&h=600&fit=crop"

# Download menu item images
curl -o images/margherita-pizza.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
curl -o images/pepperoni-pizza.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
curl -o images/garlic-bread.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
curl -o images/cheeseburger.jpg "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
curl -o images/chicken-burger.jpg "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
curl -o images/french-fries.jpg "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
curl -o images/butter-chicken.jpg "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=800&h=600&fit=crop"
curl -o images/veg-biryani.jpg "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=800&h=600&fit=crop"
curl -o images/garlic-naan.jpg "https://images.unsplash.com/photo-1585937421612-0a756fd0b09b?w=800&h=600&fit=crop"
curl -o images/california-roll.jpg "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
curl -o images/salmon-nigiri.jpg "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
curl -o images/miso-soup.jpg "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
curl -o images/chicken-noodles.jpg "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=800&h=600&fit=crop"
curl -o images/spring-rolls.jpg "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=800&h=600&fit=crop"
curl -o images/hot-sour-soup.jpg "https://images.unsplash.com/photo-1544026037-0a04791a81a6?w=800&h=600&fit=crop"
curl -o images/beef-tacos.jpg "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&h=600&fit=crop"
curl -o images/quesadilla.jpg "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&h=600&fit=crop"
curl -o images/guacamole.jpg "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&h=600&fit=crop"
curl -o images/chicken-shawarma.jpg "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
curl -o images/falafel-plate.jpg "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
curl -o images/baba-ganoush.jpg "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
curl -o images/pad-thai.jpg "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=600&fit=crop"
curl -o images/green-curry.jpg "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=600&fit=crop"
curl -o images/thai-spring-rolls.jpg "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=600&fit=crop"

echo "All images downloaded successfully!" 