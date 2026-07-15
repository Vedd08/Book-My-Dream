from PIL import Image, ImageDraw
import sys

def main():
    try:
        img_path = 'hot_air_balloon.png'
        img = Image.open(img_path).convert('RGBA')
        
        # Transparent color
        transparent = (255, 255, 255, 0)
        
        # We fill from the top-left corner. If it's white-ish, it gets replaced by transparent.
        # Threshold 30 gives some tolerance for antialiasing and compression artifacts.
        ImageDraw.floodfill(img, (0, 0), transparent, thresh=30)
        ImageDraw.floodfill(img, (img.width-1, 0), transparent, thresh=30)
        ImageDraw.floodfill(img, (0, img.height-1), transparent, thresh=30)
        ImageDraw.floodfill(img, (img.width-1, img.height-1), transparent, thresh=30)
        
        # Let's also do a pass to convert any remaining isolated solid white pixels 
        # (like near the edges) to semi-transparent to soften the edge.
        # But floodfill should be enough for a clean remove in most cases.
        
        img.save(img_path)
        print("Successfully removed white background.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()
