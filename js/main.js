// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const backToTopBtn = document.querySelector('.back-to-top');

// Initialize mobile menu
function initMobileMenu() {
    if (!hamburger || !navLinks) return;

    // Get all focusable elements in the menu
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const menuLinks = navLinks.querySelectorAll(focusableElements);
    const firstFocusableElement = menuLinks[0];
    const lastFocusableElement = menuLinks[menuLinks.length - 1];

    // Toggle mobile menu
    const toggleMenu = (focusAfterMenu = false) => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        
        // Update ARIA and classes
        hamburger.setAttribute('aria-expanded', newState);
        hamburger.classList.toggle('is-active', newState);
        navLinks.classList.toggle('active', newState);
        document.body.classList.toggle('menu-open', newState);
        
        // Handle focus management
        if (newState) {
            // Menu is opening
            trapFocus(navLinks);
            // Focus first element when menu opens
            setTimeout(() => firstFocusableElement?.focus(), 100);
        } else {
            // Menu is closing
            releaseFocus();
            // Return focus to hamburger button
            if (focusAfterMenu) {
                setTimeout(() => hamburger.focus(), 100);
            }
        }
    };

    // Close menu when clicking outside or on a link
    const handleClick = (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        const isLink = event.target.closest('a');
        
        if (isLink && isClickInsideNav) {
            // If clicking a link, close the menu after a small delay
            setTimeout(() => toggleMenu(true), 100);
            return;
        }
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            toggleMenu(true);
        }
    };

    // Close menu on escape key
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(true);
        }
        
        // Handle tab key for better keyboard navigation
        if (event.key === 'Tab') {
            if (!navLinks.classList.contains('active')) return;
            
            if (event.shiftKey && document.activeElement === firstFocusableElement) {
                // Shift + Tab on first element
                event.preventDefault();
                lastFocusableElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                // Tab on last element
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    };

    // Add touch event for better mobile handling
    const handleTouchStart = (e) => {
        // Prevent touch events from bubbling up to document
        e.stopPropagation();
    };

    // Initialize event listeners
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Use 'touchstart' for better mobile response
    document.addEventListener('touchstart', handleClick, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent touch events on menu from closing it
    navLinks.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Handle keyboard navigation in menu
    navLinks.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = navLinks.querySelectorAll('a, button, [tabindex="0"]');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Helper function to trap focus in mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a, button, [tabindex="0"]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement.focus();

    // Store current focused element
    let currentFocus = firstElement;

    // Handle tab key
    const handleTabKey = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                    currentFocus = lastElement;
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                    currentFocus = firstElement;
                }
            }
        }
    };

    // Add event listener
    element.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
}

// Helper function to release focus trap
function releaseFocus() {
    // Focus returns to hamburger button when menu is closed
    hamburger.focus();
}
// Helper function to generate image path from title
function getImagePath(title) {
    // Convert to lowercase and replace special characters with hyphens
    const filename = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    return `assets/menu/${filename}.jpg`;
}

// Make menuItems globally available
window.menuItems = [
    // Chicken Meals
    {
        id: 1,
        title: '1/4 Chicken',
        category: 'chicken',
        price: 200,
        img: getImagePath('1-4-chicken'),
        desc: 'Quarter portion of our signature grilled rotisserie chicken.'
    },
    {
        id: 2,
        title: '1/2 Chicken',
        category: 'chicken',
        price: 400,
        img: getImagePath('1-2-chicken'),
        desc: 'Half portion of our delicious grilled rotisserie chicken.'
    },
    {
        id: 3,
        title: 'Full Chicken',
        category: 'chicken',
        price: 600,
        img: getImagePath('full-chicken'),
        desc: 'Juicy whole grilled rotisserie chicken with your choice of sides.'
    },
    {
        id: 4,
        title: 'Chicken Wings (6pcs)',
        category: 'chicken',
        price: 500,
        img: getImagePath('chicken-wings-6pcs'),
        desc: 'Six pieces of our signature crispy chicken wings.'
    },
    {
        id: 5,
        title: 'Chicken Wings (12pcs)',
        category: 'chicken',
        price: 900,
        img: getImagePath('chicken-wings-12pcs'),
        desc: 'Twelve pieces of our signature crispy chicken wings.'
    },
    {
        id: 6,
        title: 'Chicken Livers',
        category: 'chicken',
        price: 400,
        img: getImagePath('chicken-livers'),
        desc: 'Tender and flavorful chicken livers.'
    },

    // Fries
    {
        id: 7,
        title: 'Regular Fries',
        category: 'fries',
        price: 150,
        img: getImagePath('regular-fries'),
        desc: 'Golden crispy fries served with kachumbari.'
    },
    {
        id: 8,
        title: 'Large Fries',
        category: 'fries',
        price: 250,
        img: getImagePath('large-fries'),
        desc: 'Generous portion of our golden crispy fries.'
    },
    {
        id: 9,
        title: 'Masala Fries',
        category: 'fries',
        price: 200,
        img: getImagePath('masala-fries'),
        desc: 'Crispy fries tossed in our special masala spice blend.'
    },

    // Shawarma
    {
        id: 10,
        title: 'Chicken Shawarma',
        category: 'shwarma',
        price: 350,
        img: getImagePath('chicken-shawarma'),
        desc: 'Classic chicken shawarma wrap with fresh vegetables and garlic sauce.'
    },
    {
        id: 11,
        title: 'Beef Shawarma',
        category: 'shwarma',
        price: 400,
        img: getImagePath('beef-shawarma'),
        desc: 'Tender beef shawarma with fresh vegetables and tahini sauce.'
    },
    {
        id: 12,
        title: 'Mix Shawarma',
        category: 'shwarma',
        price: 400,
        img: getImagePath('mix-shawarma'),
        desc: 'A delicious mix of chicken and beef shawarma with all the fixings.'
    },

    // Sides & Snacks
    {
        id: 13,
        title: 'Bhajia',
        category: 'sides',
        price: 150,
        img: getImagePath('bhajia'),
        desc: 'Crispy potato bhajias served with kachumbari.'
    },
    {
        id: 14,
        title: 'Chips Masala',
        category: 'sides',
        price: 200,
        img: getImagePath('chips-masala'),
        desc: 'Crispy chips tossed in our special masala spice blend.'
    },
    {
        id: 15,
        title: 'Kachumbari',
        category: 'sides',
        price: 100,
        img: getImagePath('kachumbari'),
        desc: 'Fresh tomato and onion salad with a hint of lemon.'
    },
    {
        id: 16,
        title: 'Coleslaw',
        category: 'sides',
        price: 100,
        img: getImagePath('coleslaw'),
        desc: 'Creamy coleslaw with fresh cabbage and carrots.'
    },
    {
        id: 17,
        title: 'Garlic Bread',
        category: 'sides',
        price: 150,
        img: getImagePath('garlic-bread'),
        desc: 'Toasted bread with garlic butter and herbs.'
    },
    {
        id: 18,
        title: 'Vegetable Samosa',
        category: 'sides',
        price: 50,
        img: getImagePath('vegetable-samosa'),
        desc: 'Crispy pastry filled with spiced vegetables.'
    },
    {
        id: 19,
        title: 'Meat Samosa',
        category: 'sides',
        price: 70,
        img: getImagePath('meat-samosa'),
        desc: 'Crispy pastry filled with spiced minced meat.'
    },

    // Pizza
    {
        id: 20,
        title: 'Chicken Tikka Pizza',
        category: 'pizza',
        price: 800,
        img: getImagePath('chicken-tikka'),
        desc: 'Pizza topped with tikka chicken, onions, and bell peppers.'
    },
    {
        id: 21,
        title: 'Pepperoni Pizza',
        category: 'pizza',
        price: 850,
        img: getImagePath('pepperoni'),
        desc: 'Classic pepperoni pizza with mozzarella and tomato sauce.'
    },
    {
        id: 22,
        title: 'Vegetable Pizza',
        category: 'pizza',
        price: 750,
        img: getImagePath('vegetable'),
        desc: 'Garden fresh vegetables on a crispy crust with mozzarella.'
    },

    // Ice Cream
    {
        id: 23,
        title: 'Vanilla Ice Cream',
        category: 'icecream',
        price: 150,
        img: getImagePath('vanilla-scoop'),
        desc: 'Creamy vanilla ice cream, one scoop.'
    },
    {
        id: 24,
        title: 'Chocolate Ice Cream',
        category: 'icecream',
        price: 150,
        img: getImagePath('chocolate-scoop'),
        desc: 'Rich chocolate ice cream, one scoop.'
    },

    // Smoothies
    {
        id: 25,
        title: 'Mango Smoothie',
        category: 'smoothies',
        price: 200,
        img: getImagePath('mango-smoothie'),
        desc: 'Refreshing mango smoothie with yogurt.'
    },
    {
        id: 26,
        title: 'Strawberry Banana Smoothie',
        category: 'smoothies',
        price: 250,
        img: getImagePath('strawberry-smoothie'),
        desc: 'Sweet strawberry and banana blended smoothie.'
    },

    // Juices
    {
        id: 27,
        title: 'Passion Fruit Juice',
        category: 'juice',
        price: 150,
        img: getImagePath('passion-juice'),
        desc: 'Freshly squeezed passion fruit juice.'
    },
    {
        id: 28,
        title: 'Mango Juice',
        category: 'juice',
        price: 150,
        img: getImagePath('mango-juice'),
        desc: 'Freshly squeezed mango juice.'
    },

    // Beverages
    {
        id: 29,
        title: 'Soda (500ml)',
        category: 'beverages',
        price: 100,
        img: getImagePath('soda-500ml'),
        desc: '500ml bottle of soda.'
    },
    {
        id: 30,
        title: 'Bottled Water',
        category: 'beverages',
        price: 50,
        img: getImagePath('bottled-water-500ml'),
        desc: '500ml bottle of mineral water.'
    },
    {
        id: 31,
        title: 'Iced Tea',
        category: 'beverages',
        price: 120,
        img: getImagePath('ice-cream-sundae'),
        desc: 'Refreshing iced tea with lemon.'
    },
    {
        id: 32,
        title: 'Coffee',
        category: 'beverages',
        price: 100,
        img: getImagePath('coffee'),
        desc: 'Freshly brewed coffee.'
    },
    {
        id: 33,
        title: 'Tea',
        category: 'beverages',
        price: 50,
        img: getImagePath('tea'),
        desc: 'Hot tea with milk and sugar.'
    },
    {
        id: 34,
        title: 'Hot Chocolate',
        category: 'beverages',
        price: 150,
        img: getImagePath('hot-chocolate'),
        desc: 'Rich and creamy hot chocolate in a mug.'
    }
];

// Handle loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // If loading screen exists, hide it after page loads
    if (loadingScreen) {
        // Show loading screen immediately
        document.body.style.overflow = 'hidden';
        
        // Hide loading screen when everything is loaded
        window.addEventListener('load', function() {
            // Add a small delay for better UX
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Remove from DOM after animation completes
                setTimeout(function() {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 500);
            }, 1000); // Minimum show time for better UX
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(function() {
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                
                setTimeout(function() {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 500);
            }
        }, 5000); // Maximum loading time before force hide
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize menu
    displayMenuItems(menuItems);
    setupMenuFilters();

    // Initialize countdown timer
    initializeCountdown();

    // Initialize Google Maps
    initializeMap();

    // Add confetti effect to call-to-action buttons
    setupConfettiEffects();
});

// Display menu items
function displayMenuItems(menuItems) {
    const menuContainer = document.querySelector('.menu-grid');
    if (!menuContainer) return;

    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-img">
                <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/food-placeholder.jpg'">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <div class="menu-item-price">KSh ${item.price}</div>
                </div>
                <p class="menu-item-desc">${item.desc}</p>
                <div class="menu-item-footer">
                    <a href="tel:0712345678" class="btn order-btn">
                        <i class="fas fa-phone"></i> Order Now
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup menu filters
function setupMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items
            const category = this.getAttribute('data-category');
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize countdown timer
function initializeCountdown() {
    const countdownElement = document.getElementById('deal-countdown');
    if (!countdownElement) return;

    // Set the countdown time (2 hours from now)
    let hours = 2;
    let minutes = 30;
    let seconds = 0;

    const updateCountdown = () => {
        // Format the time
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        countdownElement.textContent = `Offer ends in ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        
        // Update the time
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            // Countdown finished
            clearInterval(countdownInterval);
            countdownElement.textContent = 'Offer Expired!';
            countdownElement.style.color = '#ff4d4d';
            return;
        }
    };

    // Update the countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize Google Maps
function initializeMap() {
    // Check if the map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Create a script element to load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the initMap function before adding the script
    window.initMap = function() {
        // Coordinates for Embakasi East, Nairobi
        const embakasiEast = { lat: -1.3076, lng: 36.9147 };
        
        // Create a map centered on Embakasi East
        const map = new google.maps.Map(mapElement, {
            zoom: 14,
            center: embakasiEast,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color":"#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]
        });
        
        // Add a marker at the location
        new google.maps.Marker({
            position: embakasiEast,
            map: map,
            title: 'HungryBirds - Embakasi East',
            icon: {
                url: 'assets/marker.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        // Add a circle to show the delivery area (approximately 3km radius)
        new google.maps.Circle({
            strokeColor: '#FFD700',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFD700',
            fillOpacity: 0.1,
            map: map,
            center: embakasiEast,
            radius: 3000 // 3km in meters
        });
    };
    
    // Add the script to the document
    document.head.appendChild(script);
}

// Setup confetti effects for call-to-action buttons
function setupConfettiEffects() {
    // Confetti configuration
    const confettiConfig = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffff00', '#000000'],
        shapes: ['circle', 'square'],
        gravity: 0.5,
        ticks: 100
    };
    
    // Add confetti to call-to-action buttons
    document.querySelectorAll('.cta-button, .order-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only trigger confetti for left clicks
            if (e.button !== 0) return;
            
            // Create confetti
            const rect = this.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            
            // Clone the config and update the origin
            const buttonConfetti = {...confettiConfig, origin: { x, y: y * 1.2 }};
            
            // Trigger confetti
            if (window.confetti) {
                window.confetti(buttonConfetti);
            }
        });
    });
}

// Add scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.menu-item, .deal-card, .location-info, .map-container, .contact-info, .feedback-form');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Deals data
const deals = [
    {
        tag: 'Limited Time!',
        title: 'Shawarma Combo Deal',
        description: '1 Shawarma + Fries + Soda',
        price: '350',
        originalPrice: '430',
        countdownId: 'deal-countdown-1'
    },
    {
        tag: 'Popular Choice',
        title: 'Chicken Feast',
        description: '1/4 Chicken + Fries + Drink',
        price: '450',
        originalPrice: '520',
        countdownId: 'deal-countdown-2'
    },
    {
        tag: 'Family Pack',
        title: 'Family Bundle',
        description: '2 Burgers + 1.5L Soda + Fries',
        price: '850',
        originalPrice: '950',
        countdownId: 'deal-countdown-3'
    }
];

// Function to create deal card HTML
function createDealCard(deal) {
    return `
        <div class="deal-card">
            <div class="deal-tag">${deal.tag}</div>
            <h3>${deal.title}</h3>
            <p>${deal.description}</p>
            <div class="deal-price">KSh ${deal.price} <span class="original-price">KSh ${deal.originalPrice}</span></div>
            <div class="countdown" id="${deal.countdownId}">Offer ends in 02:30:00</div>
            <a href="tel:07XXXXXXX" class="cta-button">Call to Order Now</a>
        </div>
    `;
}

// Function to initialize deals carousel
function initDealsCarousel() {
    const dealsContainer = document.querySelector('.deals-carousel');
    if (!dealsContainer) return;
    
    // Clear existing content
    dealsContainer.innerHTML = '';
    
    // Add all deals to the container
    deals.forEach(deal => {
        dealsContainer.innerHTML += createDealCard(deal);
    });
    
    // Initialize countdown for each deal
    initializeCountdowns();
}

// Function to initialize countdown timers for all deals
function initializeCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
        const targetTime = new Date();
        targetTime.setHours(targetTime.getHours() + 2); // 2 hours from now
        targetTime.setMinutes(targetTime.getMinutes() + 30); // Plus 30 minutes
        
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                element.textContent = 'Offer Expired';
                return;
            }
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            element.textContent = `Offer ends in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    });
}

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollReveal();
    initDealsCarousel();
    
    // Add a small delay to ensure all elements are loaded
    setTimeout(() => {
        // Add a class to the body to indicate that JavaScript is enabled
        document.body.classList.add('js-enabled');
    }, 100);
});

// Handle form submission
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your feedback! We appreciate your input.');
        
        // Reset the form
        this.reset();
    });
}

// Add a simple animation for menu items on hover
document.addEventListener('mouseover', function(e) {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        const img = menuItem.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        const img = menuItem.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }
});
