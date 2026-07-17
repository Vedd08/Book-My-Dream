from PIL import Image

def remove_white_background(image_path, output_path, tolerance=10):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()

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

remove_white_background('public/images/holiday-packages-3d.png', 'public/images/holiday-packages-3d.png', tolerance=20)
