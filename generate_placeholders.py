from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(text, width, height, bg_color, text_color, output_path):
    """Create a placeholder image with the given text."""
    # Create a new image with the specified background color
    image = Image.new('RGB', (width, height), color=bg_color)
    
    # Initialize the drawing context
    draw = ImageDraw.Draw(image)
    
    # Use a default font (you might need to adjust the path to a font file)
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except IOError:
        font = ImageFont.load_default()
    
    # Calculate text position (centered)
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw the text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save the image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Created placeholder: {output_path}")

# Create the assets directory structure
assets_dir = os.path.join(os.path.dirname(__file__), 'assets')
menu_items = [
    ('burger1.jpg', 'Angry Burger'),
    ('burger2.jpg', 'Double Trouble'),
    ('wings1.jpg', 'Spicy Wings'),
    ('combo1.jpg', 'Chicken Combo'),
    ('combo2.jpg', 'Angry Meal'),
    ('dessert1.jpg', 'Chocolate Lava')
]

# Create placeholder images
for filename, text in menu_items:
    output_path = os.path.join(assets_dir, filename)
    create_placeholder_image(
        text=text,
        width=400,
        height=300,
        bg_color='#FFD700',  # Yellow background
        text_color='#000000',  # Black text
        output_path=output_path
    )

# Create a simple marker icon for the map
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
marker.save(os.path.join(assets_dir, 'marker.png'))
print("Created marker.png")

# Create a hero background
hero_bg = Image.new('RGB', (1920, 1080), '#000000')
draw = ImageDraw.Draw(hero_bg)
# Add some simple shapes to make it look like a background
for i in range(20):
    x1 = i * 100
    y1 = (i * 50) % 1080
    draw.ellipse((x1, y1, x1+200, y1+200), outline='#FFD700', width=2)
hero_bg.save(os.path.join(assets_dir, 'hero-bg.jpg'))
print("Created hero-bg.jpg")

print("\nPlaceholder assets have been generated in the 'assets' directory.")
print("Note: For production, replace these with actual high-quality images.")
