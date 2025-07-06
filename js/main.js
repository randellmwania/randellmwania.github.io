// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const backToTopBtn = document.querySelector('.back-to-top');

// Initialize mobile menu
function initMobileMenu() {
    if (!hamburger || !navLinks) return;

    // Toggle mobile menu
    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open', !isExpanded);
        
        // Trap focus when menu is open
        if (!isExpanded) {
            trapFocus(navLinks);
        } else {
            releaseFocus();
        }
    };

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.hamburger')) {
            toggleMenu();
        }
    };

    // Close menu on escape key
    const handleEscape = (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
            hamburger.focus();
        }
    };

    // Initialize event listeners
    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

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
const menuItems = [
    {
        id: 1,
        title: 'Angry Burger',
        category: 'burgers',
        price: 750,
        img: 'assets/burger1.jpg',
        desc: 'Juicy beef patty with melted cheese, crispy bacon, fresh lettuce, and our special Angry sauce.'
    },
    {
        id: 2,
        title: 'Spicy Wings',
        category: 'wings',
        price: 950,
        img: 'assets/wings1.jpg',
        desc: 'Crispy chicken wings tossed in your choice of sauce - Hot, BBQ, or Lemon Pepper.'
    },
    {
        id: 3,
        title: 'Chicken Combo',
        category: 'combos',
        price: 1200,
        img: 'assets/combo1.jpg',
        desc: '2 pieces of crispy chicken, fries, a drink, and a side of coleslaw.'
    },
    {
        id: 4,
        title: 'Chocolate Lava Cake',
        category: 'desserts',
        price: 450,
        img: 'assets/dessert1.jpg',
        desc: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.'
    },
    {
        id: 5,
        title: 'Double Trouble Burger',
        category: 'burgers',
        price: 950,
        img: 'assets/burger2.jpg',
        desc: 'Double beef patties with double cheese, caramelized onions, and special sauce.'
    },
    {
        id: 6,
        title: 'Angry Meal Deal',
        category: 'combos',
        price: 1200,
        img: 'assets/combo2.jpg',
        desc: '1 Angry Burger, medium fries, a drink, and a surprise Angry Birds toy!'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
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

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollReveal();
    
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
