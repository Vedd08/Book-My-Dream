from PIL import Image
import sys

def remove_white_background(image_path, output_path, tolerance=20):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.get_flattened_data()

    newData = []
    for item in datas:
        # Check if pixel is close to white
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        path = sys.argv[1]
        remove_white_background(path, path)
    else:
        print("Please provide a file path.")
