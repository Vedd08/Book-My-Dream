import os
from PIL import Image

ASSETS_DIR = "src/assets"
MAX_SIZE_MB = 1
MAX_WIDTH = 1920

def optimize_images():
    for filename in os.listdir(ASSETS_DIR):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue
            
        filepath = os.path.join(ASSETS_DIR, filename)
        file_size_mb = os.path.getsize(filepath) / (1024 * 1024)
        
        if file_size_mb > MAX_SIZE_MB:
            print(f"Optimizing {filename} (Size: {file_size_mb:.2f} MB)")
            try:
                with Image.open(filepath) as img:
                    # Convert to RGB if PNG with transparency is being saved as JPEG, but we preserve format here
                    format = img.format
                    if img.mode in ('RGBA', 'P') and format == 'JPEG':
                        img = img.convert('RGB')
                        
                    width, height = img.size
                    if width > MAX_WIDTH:
                        ratio = MAX_WIDTH / width
                        new_height = int(height * ratio)
                        img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                    
                    if format == 'JPEG':
                        img.save(filepath, format='JPEG', optimize=True, quality=80)
                    elif format == 'PNG':
                        # Can't compress PNG easily without changing format to WebP, but let's try optimize
                        img.save(filepath, format='PNG', optimize=True)
                        
                new_size_mb = os.path.getsize(filepath) / (1024 * 1024)
                print(f" -> Optimized size: {new_size_mb:.2f} MB")
            except Exception as e:
                print(f"Failed to optimize {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
