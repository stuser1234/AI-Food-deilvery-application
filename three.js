// Three.js Scene Setup
class FoodScene {
    constructor() {
        this.container = document.querySelector('#scene-container');
        this.foodPreview = document.querySelector('.food-preview');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);
        
        // Lighting
        this.lights = this.createLights();
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Food models
        this.foodModels = {};
        this.currentModel = null;
        
        // Event listeners
        this.setupEventListeners();
        
        // Start animation loop
        this.animate();
    }
    
    createLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(10, 10, 10);
        
        this.scene.add(ambientLight, mainLight);
        return { ambientLight, mainLight };
    }
    
    async loadFoodModel(category) {
        // Remove current model if exists
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
        }
        
        // Create placeholder geometry based on category
        let geometry;
        switch(category) {
            case 'pizza':
                geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
                break;
            case 'burger':
                geometry = new THREE.BoxGeometry(1, 0.5, 1);
                break;
            case 'sushi':
                geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
                break;
            case 'dessert':
                geometry = new THREE.SphereGeometry(0.5, 32, 32);
                break;
            default:
                geometry = new THREE.BoxGeometry(1, 1, 1);
        }
        
        // Create material with basic color
        const material = new THREE.MeshPhongMaterial({
            color: this.getCategoryColor(category),
            shininess: 100
        });
        
        // Create mesh
        this.currentModel = new THREE.Mesh(geometry, material);
        this.scene.add(this.currentModel);
        
        // Reset camera position
        this.camera.position.set(0, 0, 5);
        this.controls.target.set(0, 0, 0);
    }
    
    getCategoryColor(category) {
        const colors = {
            pizza: 0xff6b6b,
            burger: 0x4ecdc4,
            sushi: 0x45b7d1,
            dessert: 0x96ceb4
        };
        return colors[category] || 0xffffff;
    }
    
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
        
        // Category card clicks
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.loadFoodModel(category);
                
                // Add animation
                gsap.to(this.currentModel.rotation, {
                    y: Math.PI * 2,
                    duration: 2,
                    ease: "power2.inOut"
                });
            });
        });
        
        // Preview controls
        document.getElementById('rotate-left').addEventListener('click', () => {
            if (this.currentModel) {
                gsap.to(this.currentModel.rotation, {
                    y: "-=0.5",
                    duration: 0.5
                });
            }
        });
        
        document.getElementById('rotate-right').addEventListener('click', () => {
            if (this.currentModel) {
                gsap.to(this.currentModel.rotation, {
                    y: "+=0.5",
                    duration: 0.5
                });
            }
        });
        
        document.getElementById('zoom-in').addEventListener('click', () => {
            gsap.to(this.camera.position, {
                z: "-=0.5",
                duration: 0.5
            });
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            gsap.to(this.camera.position, {
                z: "+=0.5",
                duration: 0.5
            });
        });
    }
    
    animate() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scene = new FoodScene();
    
    // Hide loading screen after scene is ready
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
});
