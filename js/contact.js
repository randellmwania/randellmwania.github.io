// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initContactPage();
    
    function initContactPage() {
        // Set up event listeners
        setupEventListeners();
        
        // Initialize FAQ accordion
        initFAQAccordion();
    }
    
    function setupEventListeners() {
        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Open map in new tab when clicking on "Get Directions"
        const openMapBtn = document.getElementById('openMap');
        if (openMapBtn) {
            openMapBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Replace with your actual Google Maps URL
                window.open('https://www.google.com/maps/place/Embakasi+East,+Nairobi,+Kenya', '_blank');
            });
        }
        
        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Show/hide back to top button on scroll
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.visibility = 'visible';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.visibility = 'hidden';
                }
            });
        }
    }
    
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const form = e.target;
        const formData = new FormData(form);
        const formObject = {};
        
        // Convert FormData to object
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        showFormSuccess(form);
    }
    
    function showFormSuccess(form) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
            <button type="button" class="close-message">OK</button>
        `;
        
        // Style the success message
        const style = document.createElement('style');
        style.textContent = `
            .form-success {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin-top: 20px;
                border: 1px solid #e9ecef;
            }
            .success-icon {
                font-size: 4rem;
                color: #28a745;
                margin-bottom: 20px;
            }
            .success-icon i {
                animation: bounceIn 0.6s;
            }
            .form-success h3 {
                color: #28a745;
                margin-bottom: 10px;
                font-size: 1.5rem;
            }
            .form-success p {
                color: #6c757d;
                margin-bottom: 20px;
                font-size: 1.05rem;
            }
            .close-message {
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 5px;
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            .close-message:hover {
                background: #218838;
            }
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.1); opacity: 0.9; }
                75% { transform: scale(0.95); }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        
        // Add styles to head
        document.head.appendChild(style);
        
        // Replace form with success message
        form.parentNode.replaceChild(successMessage, form);
        
        // Add event listener to close button
        const closeBtn = document.querySelector('.close-message');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                // You could reset the form here if needed
                // form.reset();
                
                // Or redirect to home page
                // window.location.href = 'index.html';
                
                // For now, just remove the success message
                successMessage.remove();
            });
        }
    }
    
    // Initialize Google Maps (placeholder - you'll need to add your API key)
    function initMap() {
        // This is a placeholder for Google Maps initialization
        // You'll need to replace this with your actual Google Maps API key
        // and customize the map options as needed
        /*
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -1.2921, lng: 36.8219 }, // Coordinates for Embakasi East, Nairobi
            zoom: 15,
            styles: [
                // Add your custom map styles here
            ]
        });
        
        // Add a marker
        const marker = new google.maps.Marker({
            position: { lat: -1.2921, lng: 36.8219 },
            map: map,
            title: 'HungryBirds',
            icon: 'assets/map-marker.png' // Optional custom marker icon
        });
        */
    }
    
    // Load Google Maps API (uncomment and add your API key)
    // const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    // script.async = true;
    // script.defer = true;
    // document.head.appendChild(script);
});
