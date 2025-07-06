# HungryBirds - Angry Birds Themed Fast Food Restaurant

A modern, responsive website for HungryBirds, an Angry Birds-themed fast food restaurant in Embakasi East, Nairobi. The website is designed to encourage phone orders while providing an engaging user experience.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Interactive Menu**: Filter menu items by category
- **Deals & Promotions**: Showcase current deals with countdown timers
- **Location & Hours**: Google Maps integration with delivery zone
- **Contact Form**: Easy way for customers to send feedback
- **Angry Birds Theme**: Playful design elements and animations

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Bangers, Poppins)
- Font Awesome Icons
- Google Maps JavaScript API
- Responsive Design with CSS Grid and Flexbox

## Getting Started

### Prerequisites

- A modern web browser
- (Optional) A local web server (like Live Server in VS Code, XAMPP, WAMP, etc.)

### Installation

1. Clone the repository or download the source code
   ```bash
   git clone https://github.com/yourusername/hungrybirds-restaurant.git
   cd hungrybirds-restaurant
   ```

2. Generate placeholder images (requires Python 3.x and Pillow library)
   ```bash
   pip install pillow
   python generate_placeholders.py
   ```
   Note: For production, replace these placeholder images with actual high-quality images.

3. Open `index.html` in your web browser or use a local server to serve the files.

### Google Maps API

To enable the map functionality:

1. Get a Google Maps JavaScript API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `js/main.js` with your actual API key
3. Enable the following APIs in your Google Cloud Console:
   - Maps JavaScript API
   - Geocoding API
   - Places API

## Project Structure

```
hungrybirds/
├── assets/                 # Images and other media
│   ├── burger1.jpg         # Menu item images
│   ├── combo1.jpg
│   ├── combo2.jpg
│   ├── dessert1.jpg
│   ├── hero-bg.jpg         # Hero section background
│   ├── marker.png          # Custom map marker
│   └── wings1.jpg
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # Main JavaScript file
├── index.html              # Main HTML file
├── generate_placeholders.py # Script to generate placeholder images
└── README.md               # This file
```

## Customization

### Colors

The main color scheme can be customized by updating the CSS variables in `css/style.css`:

```css
:root {
    --primary: #000000;      /* Black */
    --secondary: #FFD700;    /* Gold/Yellow */
    --accent: #E63946;       /* Red */
    --accent-light: #FF6B6B; /* Lighter red */
    --text: #333333;         /* Dark gray */
    --text-light: #666666;   /* Medium gray */
    --bg-light: #F8F9FA;     /* Off-white */
    --white: #FFFFFF;        /* White */
}
```

### Menu Items

To update the menu items, edit the `menuItems` array in `js/main.js`:

```javascript
const menuItems = [
    {
        id: 1,
        title: 'Angry Burger',
        category: 'burgers',
        price: 750,
        img: 'assets/burger1.jpg',
        desc: 'Juicy beef patty with melted cheese, crispy bacon, fresh lettuce, and our special Angry sauce.'
    },
    // Add more menu items as needed
];
```

## Browser Support

The website is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Angry Birds game by Rovio Entertainment
- Fonts from Google Fonts
- Icons from Font Awesome
- Placeholder images generated with Python Pillow
