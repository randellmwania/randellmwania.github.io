from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageColor
import os
import random
import math

def create_placeholder_image(text, width, height, bg_color, text_color, output_path, font_size=20):
    """Create a placeholder image with the given text and styling."""
    # Create a new image with the specified background color
    image = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(image)
    
    # Try to load a nice font, fall back to default
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()
    
    # Calculate text position (centered)
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw the text with a subtle shadow for better visibility
    shadow_offset = 1
    draw.text((x + shadow_offset, y + shadow_offset), text, fill='#00000033', font=font)
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Add a subtle border
    border_color = tuple(min(255, c + 40) for c in ImageColor.getrgb(bg_color))
    draw.rectangle([0, 0, width-1, height-1], outline=border_color, width=2)
    
    # Save the image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created placeholder: {output_path}")

def create_food_placeholder(name, width, height, output_path):
    """Create a food-themed placeholder."""
    # Random food-like colors
    food_colors = ['#FFD700', '#FFA07A', '#98FB98', '#87CEEB', '#FFB6C1', '#DDA0DD']
    bg_color = random.choice(food_colors)
    create_placeholder_image(
        text=name,
        width=width,
        height=height,
        bg_color=bg_color,
        text_color='#000000',
        output_path=output_path,
        font_size=min(24, int(height * 0.1))  # Scale font size based on image height
    )

def create_team_placeholder(name, width, height, output_path):
    """Create a team member placeholder with a circle avatar."""
    # Create a blank image with a light background
    image = Image.new('RGB', (width, height), '#f5f5f5')
    draw = ImageDraw.Draw(image)
    
    # Draw a circle for the avatar
    size = min(width, height) - 40
    left = (width - size) // 2
    top = (height - size) // 2 - 20
    
    # Random color based on name
    colors = ['#E63946', '#457B9D', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
    color = colors[sum(ord(c) for c in name) % len(colors)]
    
    # Draw circle
    draw.ellipse([left, top, left + size, top + size], fill=color)
    
    # Add initial
    try:
        font_size = int(size * 0.6)
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()
    
    # Get initials
    initials = ''.join([n[0].upper() for n in name.split()[:2]])
    
    # Draw text
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = top + (size - text_height) // 2
    
    draw.text((x, y), initials, fill='white', font=font)
    
    # Add name below
    try:
        name_font = ImageFont.truetype("arial.ttf", 14)
    except IOError:
        name_font = ImageFont.load_default()
    
    name_bbox = draw.textbbox((0, 0), name, font=name_font)
    name_x = (width - (name_bbox[2] - name_bbox[0])) // 2
    name_y = top + size + 10
    
    draw.text((name_x, name_y), name, fill='#333333', font=name_font)
    
    # Add border
    draw.rectangle([0, 0, width-1, height-1], outline='#dddddd', width=1)
    
    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created team placeholder: {output_path}")

def create_character_placeholder(name, width, height, output_path):
    """Create a character/bird placeholder."""
    # Create a blank image
    image = Image.new('RGB', (width, height), '#f0f0f0')
    draw = ImageDraw.Draw(image)
    
    # Determine bird color from name
    bird_colors = {
        'red': '#E63946',
        'yellow': '#FFD700',
        'black': '#1D3557',
        'blue': '#457B9D',
        'green': '#2A9D8F'
    }
    
    color_name = next((c for c in bird_colors.keys() if c in name.lower()), 'red')
    color = bird_colors[color_name]
    
    # Draw bird body (simple circle)
    size = min(width, height) - 40
    left = (width - size) // 2
    top = (height - size) // 2
    
    draw.ellipse([left, top, left + size, top + size], fill=color)
    
    # Draw eyes
    eye_size = size // 4
    eye_left = left + size // 3 - eye_size // 2
    eye_right = left + 2 * size // 3 - eye_size // 2
    eye_top = top + size // 3 - eye_size // 2
    
    draw.ellipse([eye_left, eye_top, eye_left + eye_size, eye_top + eye_size], fill='white')
    draw.ellipse([eye_right, eye_top, eye_right + eye_size, eye_top + eye_size], fill='white')
    
    # Draw pupils
    pupil_size = eye_size // 2
    draw.ellipse([
        eye_left + (eye_size - pupil_size) // 2, 
        eye_top + (eye_size - pupil_size) // 2,
        eye_left + (eye_size + pupil_size) // 2,
        eye_top + (eye_size + pupil_size) // 2
    ], fill='black')
    
    draw.ellipse([
        eye_right + (eye_size - pupil_size) // 2, 
        eye_top + (eye_size - pupil_size) // 2,
        eye_right + (eye_size + pupil_size) // 2,
        eye_top + (eye_size + pupil_size) // 2
    ], fill='black')
    
    # Draw angry eyebrows
    eyebrow_width = eye_size * 1.2
    eyebrow_height = eye_size * 0.4
    
    # Left eyebrow
    draw.arc([
        eye_left - (eyebrow_width - eye_size) / 2,
        eye_top - eyebrow_height,
        eye_left + (eyebrow_width + eye_size) / 2,
        eye_top + eyebrow_height
    ], 220, 320, fill='black', width=3)
    
    # Right eyebrow
    draw.arc([
        eye_right - (eyebrow_width - eye_size) / 2,
        eye_top - eyebrow_height,
        eye_right + (eyebrow_width + eye_size) / 2,
        eye_top + eyebrow_height
    ], 220, 320, fill='black', width=3)
    
    # Draw beak
    beak_width = size // 3
    beak_height = size // 4
    
    draw.polygon([
        (width // 2, top + size // 2 + beak_height // 2),  # Bottom center
        (width // 2 - beak_width // 2, top + size // 2 - beak_height // 2),  # Top left
        (width // 2 + beak_width // 2, top + size // 2 - beak_height // 2)   # Top right
    ], fill='#FFA500')
    
    # Add text below
    try:
        font = ImageFont.truetype("arialbd.ttf", 16)
    except IOError:
        font = ImageFont.load_default()
    
    text = name.capitalize() + ' Bird'
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (width - text_width) // 2
    text_y = top + size + 10
    
    draw.text((text_x, text_y), text, fill='#333333', font=font)
    
    # Add border
    draw.rectangle([0, 0, width-1, height-1], outline='#dddddd', width=1)
    
    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created character placeholder: {output_path}")

def create_restaurant_image(name, width, height, output_path):
    """Create a restaurant interior/exterior placeholder."""
    # Create a blank image with a restaurant-like color
    colors = ['#F8D7DA', '#E2F3FD', '#E2F5E9', '#FEEBC8', '#F5E1FF']
    image = Image.new('RGB', (width, height), color=random.choice(colors))
    draw = ImageDraw.Draw(image)
    
    # Add some restaurant-like elements
    # Tables
    table_color = '#8B4513'  # Brown
    chair_color = '#A0522D'  # Darker brown
    
    # Draw tables and chairs
    for i in range(2):
        for j in range(2):
            # Table
            table_width = width // 4
            table_height = height // 4
            table_x = (i * 2 + 1) * (width // 4)
            table_y = (j * 2 + 1) * (height // 4)
            
            # Table top
            draw.rectangle([
                table_x - table_width//2, 
                table_y - table_height//2,
                table_x + table_width//2,
                table_y + table_height//2
            ], fill=table_color)
            
            # Table legs
            leg_width = table_width // 8
            leg_height = height // 15
            
            # Front legs
            draw.rectangle([
                table_x - table_width//3, 
                table_y + table_height//2 - 5,
                table_x - table_width//3 + leg_width,
                table_y + table_height//2 + leg_height
            ], fill=table_color)
            
            draw.rectangle([
                table_x + table_width//3 - leg_width, 
                table_y + table_height//2 - 5,
                table_x + table_width//3,
                table_y + table_height//2 + leg_height
            ], fill=table_color)
            
            # Chairs (simplified as small rectangles)
            chair_size = min(table_width, table_height) // 2
            
            # Top chair
            draw.rectangle([
                table_x - chair_size//2,
                table_y - table_height//2 - chair_size,
                table_x + chair_size//2,
                table_y - table_height//2
            ], fill=chair_color)
            
            # Bottom chair
            draw.rectangle([
                table_x - chair_size//2,
                table_y + table_height//2,
                table_x + chair_size//2,
                table_y + table_height//2 + chair_size
            ], fill=chair_color)
            
            # Left chair
            draw.rectangle([
                table_x - table_width//2 - chair_size,
                table_y - chair_size//2,
                table_x - table_width//2,
                table_y + chair_size//2
            ], fill=chair_color)
            
            # Right chair
            draw.rectangle([
                table_x + table_width//2,
                table_y - chair_size//2,
                table_x + table_width//2 + chair_size,
                table_y + chair_size//2
            ], fill=chair_color)
    
    # Add text
    try:
        font = ImageFont.truetype("arialbd.ttf", 24)
    except IOError:
        font = ImageFont.load_default()
    
    text = name.replace('-', ' ').title()
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (width - text_width) // 2
    text_y = height - 40
    
    # Semi-transparent background for text
    text_bg_height = text_bbox[3] - text_bbox[1] + 20
    draw.rectangle([
        0, 
        text_y - 10,
        width,
        text_y + text_bg_height - 10
    ], fill=(255, 255, 255, 128))
    
    draw.text((text_x, text_y), text, fill='#333333', font=font)
    
    # Add border
    draw.rectangle([0, 0, width-1, height-1], outline='#dddddd', width=2)
    
    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created restaurant image: {output_path}")

def create_map_placeholder(name, width, height, output_path):
    """Create a map placeholder."""
    # Create a blank image with a map-like color
    image = Image.new('RGB', (width, height), '#E8F4F8')
    draw = ImageDraw.Draw(image)
    
    # Draw grid lines
    grid_color = '#AAD3DF'
    grid_size = 40
    
    # Vertical lines
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    
    # Horizontal lines
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)
    
    # Draw roads (thicker lines)
    road_width = grid_size * 2
    road_color = '#B0B0B0'
    
    # Vertical road
    draw.rectangle([
        width // 2 - road_width // 2,
        0,
        width // 2 + road_width // 2,
        height
    ], fill=road_color)
    
    # Horizontal road
    draw.rectangle([
        0,
        height // 2 - road_width // 2,
        width,
        height // 2 + road_width // 2
    ], fill=road_color)
    
    # Draw buildings/squares
    building_colors = ['#FF9999', '#99CCFF', '#99FF99', '#FFCC99', '#CC99FF']
    
    for i in range(5):
        size = random.randint(grid_size * 2, grid_size * 4)
        x = random.randint(0, width - size - 1)
        y = random.randint(0, height - size - 1)
        
        # Make sure buildings don't overlap with the center (roads)
        center_x = x + size // 2
        center_y = y + size // 2
        
        if (abs(center_x - width // 2) < road_width or 
            abs(center_y - height // 2) < road_width):
            continue
        
        draw.rectangle([x, y, x + size, y + size], 
                      fill=random.choice(building_colors))
        
        # Add windows
        window_size = size // 5
        window_color = '#FFFFCC'
        
        for wx in range(x + window_size, x + size - window_size, window_size * 2):
            for wy in range(y + window_size, y + size - window_size, window_size * 2):
                if random.random() > 0.3:  # 70% chance of a window
                    draw.rectangle([
                        wx, wy, 
                        wx + window_size - 2, 
                        wy + window_size - 2
                    ], fill=window_color)
    
    # Add a marker in the center
    marker_size = min(width, height) // 5
    marker_x = width // 2 - marker_size // 2
    marker_y = height // 2 - marker_size // 2
    
    # Draw marker (red circle with white border)
    draw.ellipse([
        marker_x, marker_y,
        marker_x + marker_size,
        marker_y + marker_size
    ], fill='#E63946')
    
    draw.ellipse([
        marker_x + 5, marker_y + 5,
        marker_x + marker_size - 5,
        marker_y + marker_size - 5
    ], fill='white')
    
    # Add text
    try:
        font = ImageFont.truetype("arialbd.ttf", 20)
    except IOError:
        font = ImageFont.load_default()
    
    text = name.replace('-', ' ').title()
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (width - text_width) // 2
    text_y = 20
    
    # Semi-transparent background for text
    text_bg_height = text_bbox[3] - text_bbox[1] + 10
    draw.rectangle([
        0, 
        text_y - 5,
        width,
        text_y + text_bg_height - 5
    ], fill=(255, 255, 255, 200))
    
    draw.text((text_x, text_y), text, fill='#333333', font=font)
    
    # Add border
    draw.rectangle([0, 0, width-1, height-1], outline='#999999', width=2)
    
    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created map placeholder: {output_path}")

def main():
    # Create the assets directory structure
    base_dir = os.path.dirname(__file__)
    assets_dir = os.path.join(base_dir, 'assets')
    
    # Menu items (from the menu data in menu.js)
    menu_items = [
        # Chicken Meals
        ('1/4 Chicken', 450),
        ('1/2 Chicken', 800),
        ('Full Chicken', 1500),
        ('Chicken Wings (6pcs)', 500),
        ('Chicken Wings (12pcs)', 900),
        ('Chicken Livers', 400),
        ('Chicken Gizzards', 400),
        ('Chicken Breast', 450),
        ('Chicken Thigh', 400),
        ('Chicken Drumstick', 350),
        ('Chicken Wings (24pcs)', 1700),
        ('Chicken Livers (Full)', 700),
        ('Chicken Gizzards (Full)', 700),
        
        # Fries
        ('Regular Fries', 150),
        ('Large Fries', 250),
        ('Masala Fries', 200),
        ('Cheese Fries', 250),
        ('Chili Cheese Fries', 300),
        
        # Shawarma
        ('Chicken Shawarma', 350),
        ('Beef Shawarma', 400),
        ('Mix Shawarma', 400),
        ('Shawarma Platter', 500),
        ('Shawarma Wrap', 300),
        
        # Sides & Snacks
        ('Bhajia', 150),
        ('Chips Masala', 200),
        ('Kachumbari', 100),
        ('Coleslaw', 100),
        ('Garlic Bread', 150),
        ('Vegetable Samosa', 50),
        ('Meat Samosa', 70),
        ('Sausage', 100),
        
        # Pizza
        ('Chicken Tikka', 800),
        ('Pepperoni', 850),
        ('Vegetable', 750),
        ('BBQ Chicken', 850),
        ('Hawaiian', 800),
        ('Meat Lovers', 900),
        ('Margherita', 700),
        
        # Ice Cream
        ('Vanilla Scoop', 100),
        ('Chocolate Scoop', 100),
        ('Strawberry Scoop', 100),
        ('Mango Scoop', 100),
        ('Pistachio Scoop', 120),
        ('Ice Cream Sundae', 250),
        ('Banana Split', 300),
        
        # Smoothies
        ('Mango Smoothie', 200),
        ('Strawberry Smoothie', 200),
        ('Banana Smoothie', 200),
        ('Passion Smoothie', 200),
        ('Tropical Smoothie', 250),
        ('Avocado Smoothie', 250),
        
        # Juice
        ('Orange Juice', 150),
        ('Mango Juice', 150),
        ('Passion Juice', 150),
        ('Pineapple Juice', 150),
        ('Watermelon Juice', 150),
        ('Avocado Juice', 200),
        
        # Beverages
        ('Soda (300ml)', 80),
        ('Soda (500ml)', 120),
        ('Bottled Water (500ml)', 50),
        ('Bottled Water (1L)', 80),
        ('Mineral Water (500ml)', 60),
        ('Mineral Water (1L)', 100),
        ('Energy Drink', 150),
        ('Milk Shake', 200)
    ]
    
    # Create menu item placeholders
    for item_name, _ in menu_items:
        # Create a simplified filename (lowercase, no special chars)
        filename = ''.join(c if c.isalnum() else '-' for c in item_name).lower()
        filename = '-'.join(filter(None, filename.split('-')))
        output_path = os.path.join(assets_dir, 'menu', f"{filename}.jpg")
        create_food_placeholder(
            name=item_name,
            width=400,
            height=300,
            output_path=output_path
        )
    
    # Create team member placeholders
    team_members = [
        ('John Doe', 'chef1.jpg'),
        ('Jane Smith', 'manager.jpg'),
        ('Robert Johnson', 'owner.jpg')
    ]
    
    for name, filename in team_members:
        output_path = os.path.join(assets_dir, 'team', filename)
        create_team_placeholder(
            name=name,
            width=200,
            height=250,
            output_path=output_path
        )
    
    # Create testimonial placeholders
    customers = [
        ('Alice Johnson', 'customer1.jpg'),
        ('Michael Brown', 'customer2.jpg')
    ]
    
    for name, filename in customers:
        output_path = os.path.join(assets_dir, 'testimonials', filename)
        create_team_placeholder(  # Reuse team placeholder for customers
            name=name,
            width=150,
            height=200,
            output_path=output_path
        )
    
    # Create character placeholders
    characters = [
        'redbird',
        'yellowbird',
        'blackbird'
    ]
    
    for char in characters:
        output_path = os.path.join(assets_dir, f"{char}.png")
        create_character_placeholder(
            name=char,
            width=200,
            height=250,
            output_path=output_path
        )
    
    # Create restaurant images
    restaurant_images = [
        'restaurant-interior.jpg',
        'restaurant-exterior.jpg'
    ]
    
    for img in restaurant_images:
        output_path = os.path.join(assets_dir, img)
        create_restaurant_image(
            name=os.path.splitext(img)[0],
            width=800,
            height=500,
            output_path=output_path
        )
    
    # Create map placeholder
    create_map_placeholder(
        name='HungryBirds Location',
        width=800,
        height=500,
        output_path=os.path.join(assets_dir, 'map-placeholder.jpg')
    )
    
    # Create generic placeholders
    placeholders = [
        ('placeholder-food.jpg', 'Food Item', 400, 300),
        ('placeholder-user.png', 'User', 200, 200),
        ('hero-bg.jpg', 'Hero Background', 1920, 1080)
    ]
    
    for filename, text, width, height in placeholders:
        output_path = os.path.join(assets_dir, filename)
        if 'user' in filename.lower():
            create_team_placeholder(
                name=text,
                width=width,
                height=height,
                output_path=output_path
            )
        elif 'food' in filename.lower():
            create_food_placeholder(
                name=text,
                width=width,
                height=height,
                output_path=output_path
            )
        else:
            create_placeholder_image(
                text=text,
                width=width,
                height=height,
                bg_color='#f0f0f0',
                text_color='#333333',
                output_path=output_path
            )
    
    # Create a simple marker icon for the map if needed
    marker_path = os.path.join(assets_dir, 'marker.png')
    if not os.path.exists(marker_path):
        marker_size = 64
        marker = Image.new('RGBA', (marker_size, marker_size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(marker)
        # Draw a simple circle with an angry face
        draw.ellipse((0, 0, marker_size-1, marker_size-1), fill='#E63946')  # Red circle
        # Angry eyebrows
        draw.arc((15, 15, 35, 35), 200, 340, fill='#000000', width=3)
        draw.arc((45, 15, 65, 35), 200, 340, fill='#000000', width=3)
        # Angry mouth
        draw.arc((25, 40, 75, 65), 0, 180, fill='#000000', width=3)
        marker.save(marker_path)
        print("Created marker.png")
    
    print("\nAll placeholder assets have been generated in the 'assets' directory.")
    print("Note: For production, replace these with actual high-quality images.")

if __name__ == "__main__":
    main()
