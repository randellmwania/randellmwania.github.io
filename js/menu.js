// Menu Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let cart = [];
    let orderTotal = 0;
    const cartCount = document.querySelector('.item-count');
    const orderItems = document.querySelector('.order-items');
    const emptyOrder = document.querySelector('.empty-order');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const floatingBtn = document.querySelector('.floating-order-btn');
    const orderSidebar = document.querySelector('.order-sidebar');
    const closeOrderBtn = document.querySelector('.close-order');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuContainer = document.querySelector('.menu-items .container');
    
    // Make sure menuItems is available
    if (!window.menuItems) {
        console.error('menuItems array not found. Make sure main.js is loaded before menu.js');
        return;
    }
    
    // Category display names mapping
    const categoryDisplayNames = {
        'chicken': 'CHICKEN MEALS',
        'fries': 'FRIES',
        'shwarma': 'SHAWARMA FEST',
        'sides': 'SIDES & SNACKS',
        'pizza': 'PIZZA FEST',
        'icecream': 'ICE-CREAM',
        'smoothies': 'SMOOTHIE FUSION',
        'juice': 'JUICE',
        'beverages': 'HOT & COLD BEVERAGES'
    };
    
    // Category icons mapping
    const categoryIcons = {
        'chicken': '🍗',
        'fries': '🍟',
        'shwarma': '🌯',
        'sides': '🍛',
        'pizza': '🍕',
        'icecream': '🍦',
        'smoothies': '🥤',
        'juice': '🍹',
        'beverages': '☕'
    };
    
    // Notes for specific categories
    const categoryNotes = {
        'fries': 'All served with kachumbari – Free',
        'pizza': 'All Medium – KSh 700',
        'smoothies': 'Small – KSh 100 | Large – KSh 200',
        'juice': 'Small – KSh 50 | Large – KSh 100',
        'beverages': 'Served hot or cold'
    };
    
    // Initialize the page
    initMenuPage();
    
    // Initialize menu page functionality
    function initMenuPage() {
        // Clear existing menu items
        menuContainer.innerHTML = '';
        
        // Load cart from localStorage if available
        loadCart();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize menu filtering
        initMenuFiltering();
        
        // Get category from URL and filter if needed
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            // Filter by category from URL
            filterMenuItems(category);
        } else {
            // Show all items
            generateMenuItems();
        }
    }
    
    // Generate menu items from the menuItems array
    function generateMenuItems(filterCategory = null) {
        // Clear existing menu items
        menuContainer.innerHTML = '';
        
        // Add 'Show All' button if a category is filtered
        if (filterCategory) {
            const showAllBtn = document.createElement('a');
            showAllBtn.href = 'menu.html';
            showAllBtn.className = 'show-all-btn';
            showAllBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Show All Categories';
            menuContainer.appendChild(showAllBtn);
        }
        
        // Filter items by category if specified
        const filteredItems = filterCategory 
            ? window.menuItems.filter(item => item.category === filterCategory)
            : window.menuItems;
            
        // Group items by category
        const itemsByCategory = {};
        
        // Initialize categories
        Object.keys(categoryDisplayNames).forEach(category => {
            itemsByCategory[category] = [];
        });
        
        // Group filtered items by category
        filteredItems.forEach(item => {
            if (itemsByCategory[item.category]) {
                itemsByCategory[item.category].push(item);
            }
        });
        
        // Generate HTML for each category
        Object.entries(itemsByCategory).forEach(([category, items]) => {
            if (items.length === 0) return;
            
            const categorySection = document.createElement('div');
            categorySection.className = 'menu-category';
            categorySection.id = category;
            
            // Create category header
            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'category-title';
            categoryHeader.textContent = `${categoryIcons[category] || '🍽️'} ${categoryDisplayNames[category] || category.toUpperCase()}`;
            categorySection.appendChild(categoryHeader);
            
            // Add category note if exists
            if (categoryNotes[category]) {
                const note = document.createElement('p');
                note.className = 'menu-note';
                note.textContent = categoryNotes[category];
                categorySection.appendChild(note);
            }
            
            // Create menu grid
            const menuGrid = document.createElement('div');
            menuGrid.className = 'menu-grid';
            
            // Add items to grid
            items.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.dataset.category = item.category;
                
                // Create image container
                const itemImage = document.createElement('div');
                itemImage.className = 'item-image';
                const img = document.createElement('img');
                img.src = item.img || 'assets/placeholder-food.jpg';
                img.alt = item.title;
                img.loading = 'lazy';
                itemImage.appendChild(img);
                
                const itemDetails = document.createElement('div');
                itemDetails.className = 'item-details';
                
                const itemHeader = document.createElement('div');
                itemHeader.className = 'item-header';
                
                const itemTitle = document.createElement('h3');
                itemTitle.textContent = item.title;
                
                const itemDesc = document.createElement('p');
                itemDesc.className = 'item-desc';
                itemDesc.textContent = item.desc || '';
                
                const itemFooter = document.createElement('div');
                itemFooter.className = 'item-footer';
                
                const itemPrice = document.createElement('span');
                itemPrice.className = 'item-price';
                itemPrice.textContent = `KSh ${item.price.toLocaleString()}`;
                
                const addToCartBtn = document.createElement('button');
                addToCartBtn.type = 'button';
                addToCartBtn.className = 'add-to-cart';
                addToCartBtn.dataset.item = item.title;
                addToCartBtn.dataset.price = item.price;
                addToCartBtn.innerHTML = '<i class="fas fa-plus"></i> Add to Order';
                
                // Append elements
                itemHeader.appendChild(itemTitle);
                itemFooter.appendChild(itemPrice);
                itemFooter.appendChild(addToCartBtn);
                
                itemDetails.appendChild(itemHeader);
                if (item.desc) itemDetails.appendChild(itemDesc);
                itemDetails.appendChild(itemFooter);
                
                menuItem.appendChild(itemImage);
                menuItem.appendChild(itemDetails);
                menuGrid.appendChild(menuItem);
            });
            
            categorySection.appendChild(menuGrid);
            menuContainer.appendChild(categorySection);
        });
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        // Toggle order sidebar
        floatingBtn.addEventListener('click', toggleOrderSidebar);
        closeOrderBtn.addEventListener('click', toggleOrderSidebar);
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (orderSidebar.classList.contains('active') && 
                !orderSidebar.contains(e.target) && 
                !floatingBtn.contains(e.target)) {
                orderSidebar.classList.remove('active');
            }
        });
        
        // Prevent event propagation for the sidebar
        orderSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle checkout button click
        checkoutBtn.addEventListener('click', handleCheckout);
        
        // Add animation to menu items on scroll
        animateOnScroll();
        
        // Add scroll event listener for animation
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Initialize menu filtering functionality
    function initMenuFiltering() {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                filterMenuItems(category);
            });
        });
        
        // Initialize with all items showing
        filterMenuItems('all');
    }
    
    // Filter menu items based on category
    function filterMenuItems(category) {
        // Update active state of category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // If 'all' or no category, show all items and update URL
        if (!category || category === 'all') {
            // Update URL to remove category parameter
            window.history.pushState({}, '', window.location.pathname);
            
            // Show all menu items and categories
            document.querySelectorAll('.menu-item, .menu-category').forEach(el => {
                el.style.display = '';
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Hide all menu items first
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'none';
        });
        
        // Show only items from the selected category
        const visibleItems = document.querySelectorAll(`.menu-item[data-category="${category}"]`);
        visibleItems.forEach(item => {
            item.style.display = 'flex';
            
            // Make sure the parent category is visible
            let parentCategory = item.closest('.menu-category');
            if (parentCategory) {
                parentCategory.style.display = 'block';
                
                // Scroll to the category after a short delay
                setTimeout(() => {
                    parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
        
        // Hide empty categories
        document.querySelectorAll('.menu-category').forEach(section => {
            const hasVisibleItems = section.querySelector('.menu-item[style*="display: flex"]');
            section.style.display = hasVisibleItems ? 'block' : 'none';
        });
        
        // Update URL with category parameter
        const newUrl = `${window.location.pathname}?category=${category}`;
        window.history.pushState({}, '', newUrl);
    }
    
    // Add item to cart
    function addToCart(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const itemCard = button.closest('.menu-item');
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        
        // Get any selected options (sauces, drinks, etc.)
        let options = [];
        
        // Check for sauce options
        const sauceOptions = itemCard.querySelectorAll('.sauce-options input[type="radio"]:checked, .sauce-options input[type="checkbox"]:checked');
        if (sauceOptions.length > 0) {
            sauceOptions.forEach(option => {
                options.push(option.value);
            });
        }
        
        // Check for drink options
        const drinkOptions = itemCard.querySelectorAll('.drink-options input[type="radio"]:checked');
        if (drinkOptions.length > 0) {
            drinkOptions.forEach(option => {
                if (option.checked) {
                    options.push(option.value);
                }
            });
        }
        
        // Check for combo options
        const comboSelects = itemCard.querySelectorAll('.combo-select');
        if (comboSelects.length > 0) {
            comboSelects.forEach(select => {
                const optionName = select.getAttribute('data-option');
                const optionValue = select.options[select.selectedIndex].text;
                options.push(`${optionName}: ${optionValue}`);
            });
        }
        
        // Create cart item object
        const cartItem = {
            id: Date.now(),
            name: itemName,
            price: itemPrice,
            options: options,
            quantity: 1,
            image: itemCard.querySelector('img') ? itemCard.querySelector('img').src : ''
        };
        
        // Check if item with same name and options already exists in cart
        const existingItemIndex = cart.findIndex(item => 
            item.name === cartItem.name && 
            JSON.stringify(item.options) === JSON.stringify(cartItem.options)
        );
        
        if (existingItemIndex > -1) {
            // Increment quantity if item already exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.push(cartItem);
        }
        
        // Update cart UI and save to localStorage
        updateCart();
        saveCart();
        
        // Show success message or animation
        showAddToCartSuccess(button);
    }
    
    // Show success animation when adding to cart
    function showAddToCartSuccess(button) {
        // Add animation class
        button.classList.add('added-to-cart');
        
        // Change button text temporarily
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        
        // Reset button after animation
        setTimeout(() => {
            button.classList.remove('added-to-cart');
            button.innerHTML = originalText;
        }, 1500);
        
        // Animate cart icon
        animateCartIcon();
    }
    
    // Animate cart icon when adding items
    function animateCartIcon() {
        floatingBtn.classList.add('bounce');
        setTimeout(() => {
            floatingBtn.classList.remove('bounce');
        }, 1000);
    }
    
    // Update cart UI
    function updateCart() {
        // Update cart count
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
        
        // Update order items list
        orderItems.innerHTML = '';
        
        if (cart.length === 0) {
            orderItems.appendChild(emptyOrder.cloneNode(true));
            checkoutBtn.disabled = true;
            orderTotal = 0;
        } else {
            // Add each item to the order list
            cart.forEach((item, index) => {
                const itemElement = createCartItemElement(item, index);
                orderItems.appendChild(itemElement);
            });
            
            checkoutBtn.disabled = false;
            
            // Update total
            orderTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        
        // Update total amount
        totalAmount.textContent = `KSh ${orderTotal.toLocaleString()}`;
        
        // Add event listeners to quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', updateQuantity);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Create cart item element
    function createCartItemElement(item, index) {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.dataset.index = index;
        
        let optionsHtml = '';
        if (item.options && item.options.length > 0) {
            optionsHtml = `<div class="order-item-options">${item.options.join(', ')}</div>`;
        }
        
        itemElement.innerHTML = `
            <div class="order-item-img">
                <img src="${item.image || 'assets/placeholder-food.jpg'}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                ${optionsHtml}
                <div class="order-item-price">KSh ${(item.price * item.quantity).toLocaleString()}</div>
            </div>
            <div class="order-item-quantity">
                <button type="button" class="quantity-btn minus">-</button>
                <span class="quantity">${item.quantity}</span>
                <button type="button" class="quantity-btn plus">+</button>
                <span class="remove-item" title="Remove item">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        `;
        
        return itemElement;
    }
    
    // Update item quantity
    function updateQuantity(e) {
        const button = e.currentTarget;
        const quantityElement = button.parentElement.querySelector('.quantity');
        const itemElement = button.closest('.order-item');
        const itemIndex = parseInt(itemElement.dataset.index);
        
        if (button.classList.contains('plus')) {
            cart[itemIndex].quantity += 1;
        } else if (button.classList.contains('minus')) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                // Remove item if quantity reaches 0
                cart.splice(itemIndex, 1);
            }
        }
        
        // Update cart and save
        updateCart();
        saveCart();
    }
    
    // Remove item from cart
    function removeItem(e) {
        const button = e.currentTarget;
        const itemElement = button.closest('.order-item');
        const itemIndex = parseInt(itemElement.dataset.index);
        
        // Remove item from cart
        cart.splice(itemIndex, 1);
        
        // Update cart and save
        updateCart();
        saveCart();
    }
    
    // Toggle order sidebar
    function toggleOrderSidebar() {
        orderSidebar.classList.toggle('active');
    }
    
    // Handle checkout
    function handleCheckout() {
        if (cart.length === 0) return;
        
        // Create order summary text
        let orderText = "*HungryBirds Order*%0A%0A";
        orderText += "*Order Details:*%0A";
        
        cart.forEach((item, index) => {
            orderText += `${index + 1}. ${item.name} (${item.quantity}x) - KSh ${(item.price * item.quantity).toLocaleString()}%0A`;
            
            if (item.options && item.options.length > 0) {
                orderText += `   • ${item.options.join('%0A   • ')}%0A`;
            }
        });
        
        orderText += `%0A*Total: KSh ${orderTotal.toLocaleString()}*%0A%0A`;
        orderText += "*Delivery Address:*%0A[Please provide your full address]%0A%0A";
        orderText += "*Special Instructions:*%0A[Any special requests or instructions]";
        
        // Encode the order text for WhatsApp
        const phoneNumber = "254700000000"; // Replace with actual restaurant number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderText}`;
        
        // Open WhatsApp with the order
        window.open(whatsappUrl, '_blank');
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('hungrybirds_cart', JSON.stringify(cart));
    }
    
    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('hungrybirds_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }
    
    // Animate menu items on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.menu-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations on page load
    animateOnScroll();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-15px);}
        60% {transform: translateY(-7px);}
    }
    
    .floating-order-btn.bounce {
        animation: bounce 1s;
    }
    
    .added-to-cart {
        animation: pulse 0.5s;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
