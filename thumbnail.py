from flask import Flask, jsonify, request, send_file
import os
import cv2
import base64
import numpy as np
from PIL import Image, ImageDraw, ImageColor, ImageFont
from io import BytesIO
import random


patterns = [
    "circles", "spirals", "triangle", 
    "stars", "smoke_trails", "dots", "hexagons", "starfield", "confetti", "crystal_patterns", "waves", "origami",
    "diamond", "hearts"
]

current_pattern_index = 0  

width, height = 1280, 720
title_area_top = 60
title_area_bottom = 280
title_area_left = 100
title_area_right = width - 50

def load_pattern_index():
    global current_pattern_index
    try:
        with open("pattern_index.txt", "r") as f:
            current_pattern_index = int(f.read().strip())
    except FileNotFoundError:
        current_pattern_index = 0  

def save_pattern_index():
    with open("pattern_index.txt", "w") as f:
        f.write(str(current_pattern_index))

def get_next_pattern():
    global current_pattern_index
    pattern = patterns[current_pattern_index]
    current_pattern_index = (current_pattern_index + 1) % len(patterns)  
    save_pattern_index()  
    return pattern


def generate_thumbnails(title):
    try:
        
        width, height = 1280, 720

        bg = np.zeros((height, width, 4), dtype=np.uint8)  

        start_color = np.random.randint(0, 256, 3)  
        end_color = np.random.randint(0, 256, 3)    

        alpha_start = 128  
        alpha_end = 255    

        for y in range(height):
            t = y / height
            color = (1 - t) * start_color + t * end_color
            alpha = int((1 - t) * alpha_start + t * alpha_end)
            bg[y, :, :3] = color  
            bg[y, :, 3] = alpha   

        overlay = bg.copy()

        pattern_choice = get_next_pattern()

        if pattern_choice == "circles":
            centers_x = np.random.randint(0, width, size=100)
            centers_y = np.random.randint(0, height, size=100)
            radii = np.random.randint(10, 50, size=100)
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)
                if not (title_area_left < centers_x[i] < title_area_right and title_area_top < centers_y[i] < title_area_bottom):
                    cv2.circle(overlay, (centers_x[i], centers_y[i]), radii[i], color, -1)
                    
        elif pattern_choice == "rectangles":
            
            top_left_x = np.random.randint(0, width, size=100)
            top_left_y = np.random.randint(0, height, size=100)
            widths = np.random.randint(10, 100, size=100)
            heights = np.random.randint(10, 100, size=100)
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)  
                
                bottom_right_x = top_left_x[i] + widths[i]
                bottom_right_y = top_left_y[i] + heights[i]
                
                if not (title_area_left < top_left_x[i] < title_area_right and title_area_top < top_left_y[i] < title_area_bottom):
                    cv2.rectangle(overlay, (top_left_x[i], top_left_y[i]), (bottom_right_x, bottom_right_y), color, -1)
                    
        elif pattern_choice == "diamonds":
            centers_x = np.random.randint(0, width, size=100)
            centers_y = np.random.randint(0, height, size=100)
            radii = np.random.randint(20, 50, size=100)
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)
                
                half_size = radii[i] // 2
                points = np.array([[
                    [centers_x[i], centers_y[i] - half_size],  
                    [centers_x[i] + half_size, centers_y[i]],  
                    [centers_x[i], centers_y[i] + half_size],  
                    [centers_x[i] - half_size, centers_y[i]]   
                ]], dtype=np.int32)
                
                if not (title_area_left < centers_x[i] < title_area_right and 
                        title_area_top < centers_y[i] < title_area_bottom):
                    cv2.fillPoly(overlay, points, color)


        elif pattern_choice == "confetti":
            num_shapes = 200  
            centers_x = np.random.randint(0, width, size=num_shapes)
            centers_y = np.random.randint(0, height, size=num_shapes)
            sizes = np.random.randint(5, 20, size=num_shapes)  
            colors = np.random.randint(0, 256, size=(num_shapes, 3))
            shape_types = np.random.choice(['circle', 'rectangle', 'triangle'], size=num_shapes)

            for i in range(num_shapes):
                color = tuple(colors[i].tolist()) + (128,)  
                size = sizes[i]
                
                if shape_types[i] == 'circle':
                    cv2.circle(overlay, (centers_x[i], centers_y[i]), size, color, -1)
                elif shape_types[i] == 'rectangle':
                    top_left = (centers_x[i] - size // 2, centers_y[i] - size // 2)
                    bottom_right = (centers_x[i] + size // 2, centers_y[i] + size // 2)
                    cv2.rectangle(overlay, top_left, bottom_right, color, -1)
                elif shape_types[i] == 'triangle':
                    points = np.array([[centers_x[i], centers_y[i] - size], 
                                    [centers_x[i] - size, centers_y[i] + size], 
                                    [centers_x[i] + size, centers_y[i] + size]], dtype=np.int32)
                    cv2.fillPoly(overlay, [points], color)



        elif pattern_choice == "waves":
            y_coords = np.arange(height)
            for i in range(0, width, 20):
                amplitude = random.randint(10, 50)
                x_coords = (i + amplitude * np.sin(2 * np.pi * y_coords / 100)).astype(int)
                valid_indices = (x_coords >= 0) & (x_coords < width)
                y_valid = y_coords[valid_indices]
                x_valid = x_coords[valid_indices]
                for x, y in zip(x_valid, y_valid):
                    if not (title_area_left < x < title_area_right and title_area_top < y < title_area_bottom):
                        color = tuple(np.random.randint(0, 256, size=3).tolist()) + (128,)
                        overlay[y, x] = color
                        
        elif pattern_choice == "crystal_patterns":
            num_crystals = 50

            centers_x = np.random.randint(50, width - 50, size=num_crystals)
            centers_y = np.random.randint(50, height - 50, size=num_crystals)
            sizes = np.random.randint(20, 100, size=num_crystals)  
            rotations = np.random.randint(0, 360, size=num_crystals)  
            color_variations = np.random.randint(100, 255, size=(num_crystals, 3))  
            transparency = np.random.uniform(0.1, 0.3, size=num_crystals)  

            for i in range(num_crystals):
                center = (centers_x[i], centers_y[i])
                size = sizes[i]
                angle = rotations[i]
                color = tuple(color_variations[i].tolist()) + (int(transparency[i] * 255),)  

                num_points = np.random.randint(6, 12)  
                angle_step = 2 * np.pi / num_points
                points = []
                for j in range(num_points):
                    x = center[0] + size * np.cos(angle + j * angle_step)
                    y = center[1] + size * np.sin(angle + j * angle_step)
                    points.append((x, y))

                points = np.array(points, np.int32)
                points = points.reshape((-1, 1, 2))

                cv2.fillPoly(overlay, [points], color)

                        
        elif pattern_choice == "triangles":
            
            vertices_x = np.random.randint(0, width, size=(100, 3))  
            vertices_y = np.random.randint(0, height, size=(100, 3))
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                
                points = np.array([[[vertices_x[i, 0], vertices_y[i, 0]],
                                    [vertices_x[i, 1], vertices_y[i, 1]],
                                    [vertices_x[i, 2], vertices_y[i, 2]]]], dtype=np.int32)
                
                color = tuple(colors[i].tolist()) + (128,)  
                
                if not (title_area_left < min(vertices_x[i]) < title_area_right and 
                        title_area_top < min(vertices_y[i]) < title_area_bottom):
                    cv2.fillPoly(overlay, points, color)


                    
        elif pattern_choice == "hexagons":
            
            centers_x = np.random.randint(0, width, size=100)
            centers_y = np.random.randint(0, height, size=100)
            radii = np.random.randint(20, 50, size=100)
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)
                
                angle = np.linspace(0, 2 * np.pi, 7)  
                x_points = centers_x[i] + radii[i] * np.cos(angle)
                y_points = centers_y[i] + radii[i] * np.sin(angle)
                
                hexagon_points = np.array([list(zip(x_points, y_points))], dtype=np.int32)
                
                if not (title_area_left < centers_x[i] < title_area_right and 
                        title_area_top < centers_y[i] < title_area_bottom):
                    cv2.fillPoly(overlay, hexagon_points, color)

                    
        elif pattern_choice == "dots":
            centers_x = np.random.randint(0, width, size=100)
            centers_y = np.random.randint(0, height, size=100)
            radii = np.random.randint(5, 15, size=100)
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)
                
                if not (title_area_left < centers_x[i] < title_area_right and 
                        title_area_top < centers_y[i] < title_area_bottom):
                    cv2.circle(overlay, (centers_x[i], centers_y[i]), radii[i], color, -1)

        elif pattern_choice == "stars":
            centers_x = np.random.randint(0, width, size=100)
            centers_y = np.random.randint(0, height, size=100)
            radii = np.random.randint(20, 50, size=100)
            points = np.random.randint(5, 10, size=100)  
            colors = np.random.randint(0, 256, size=(100, 3))

            for i in range(100):
                color = tuple(colors[i].tolist()) + (128,)
                num_points = points[i]
                
                angle = np.linspace(0, 2 * np.pi, num_points + 1)
                x_points = centers_x[i] + radii[i] * np.cos(angle)
                y_points = centers_y[i] + radii[i] * np.sin(angle)
                
                star_points = np.array([list(zip(x_points, y_points))], dtype=np.int32)
                
                if not (title_area_left < centers_x[i] < title_area_right and 
                        title_area_top < centers_y[i] < title_area_bottom):
                    cv2.fillPoly(overlay, star_points, color)
                    
        elif pattern_choice == "smoke_trails":
            num_particles = 200

            particles = []

            for _ in range(num_particles):
                x = np.random.randint(0, width)
                y = np.random.randint(0, height)
                angle = np.random.uniform(0, 2 * np.pi)  
                speed = np.random.uniform(1, 5)  
                size = np.random.randint(5, 20)  
                lifetime = np.random.randint(50, 200)  
                alpha = np.random.uniform(0.1, 0.3)  
                
                particles.append([x, y, angle, speed, size, lifetime, alpha])

            for i in range(num_particles):
                particles[i][0] += particles[i][3] * np.cos(particles[i][2])
                particles[i][1] += particles[i][3] * np.sin(particles[i][2])
                
                particles[i][5] -= 1
                
                particles[i][6] *= 0.98  

                if particles[i][5] > 0 and 0 <= particles[i][0] < width and 0 <= particles[i][1] < height:
                    color = (255, 255, 255, int(particles[i][6] * 255))  
                    cv2.circle(overlay, (int(particles[i][0]), int(particles[i][1])), particles[i][4], color, -1)
                    
        elif pattern_choice == "starfield":
            num_stars = 500

            star_positions = np.random.randint(0, [width, height], size=(num_stars, 2))

            min_size = 3
            max_size = 6
            star_sizes = np.random.randint(min_size, max_size + 1, size=num_stars)  

            star_brightness = np.random.uniform(0.1, 0.5, size=num_stars)  

            for i in range(num_stars):
                x, y = star_positions[i]
                size = star_sizes[i]
                brightness = star_brightness[i]
                alpha = int(brightness * 255)  

                color = (255, 255, 255, alpha)
                
                cv2.circle(overlay, (x, y), size, color, -1)
                
        elif pattern_choice == "origami":
            num_shapes = 30

            centers_x = np.random.randint(50, width - 50, size=num_shapes)
            centers_y = np.random.randint(50, height - 50, size=num_shapes)
            sizes = np.random.randint(30, 100, size=num_shapes)  
            rotations = np.random.randint(0, 360, size=num_shapes)  
            color_variations = np.random.randint(100, 255, size=(num_shapes, 3))  
            transparency = np.random.uniform(0.1, 0.4, size=num_shapes)  

            for i in range(num_shapes):
                center = (centers_x[i], centers_y[i])
                size = sizes[i]
                angle = rotations[i]
                color = tuple(color_variations[i].tolist()) + (int(transparency[i] * 255),)  

                num_sides = 3  
                angle_step = 2 * np.pi / num_sides
                points = []
                for j in range(num_sides):
                    x = center[0] + size * np.cos(angle + j * angle_step)
                    y = center[1] + size * np.sin(angle + j * angle_step)
                    points.append((x, y))

                points = np.array(points, np.int32)
                points = points.reshape((-1, 1, 2))

                cv2.fillPoly(overlay, [points], color)

                for j in range(num_sides):
                    x1, y1 = points[j][0]
                    x2, y2 = points[(j + 1) % num_sides][0]
                    cv2.line(overlay, (x1, y1), (x2, y2), color, 2)


        elif pattern_choice == "hearts":
            centers_x = np.random.randint(0, width, size=50)
            centers_y = np.random.randint(0, height, size=50)
            sizes = np.random.randint(20, 50, size=50)
            colors = np.random.randint(0, 256, size=(50, 3))
            
            for i in range(50):
                center = (centers_x[i], centers_y[i])
                size = sizes[i]
                if title_area_top < center[1] < title_area_bottom and title_area_left < center[0] < title_area_right:
                    continue
                color = tuple(colors[i].tolist()) + (128,)
                cv2.ellipse(overlay, (center[0] - size // 3, center[1] - size // 3), (size // 3, size // 3), 0, 0, 180, color, -1)
                cv2.ellipse(overlay, (center[0] + size // 3, center[1] - size // 3), (size // 3, size // 3), 0, 0, 180, color, -1)
                pts = np.array([
                    (center[0] - size, center[1] - size // 3),
                    (center[0] + size, center[1] - size // 3),
                    (center[0], center[1] + size)
                ], np.int32)
                cv2.fillPoly(overlay, [pts], color, lineType=cv2.LINE_AA)

        alpha_overlay = overlay[:, :, 3] / 255.0
        for c in range(3):
            bg[:, :, c] = (1 - alpha_overlay) * bg[:, :, c] + alpha_overlay * overlay[:, :, c]

        image_pil = Image.fromarray(bg)
        draw = ImageDraw.Draw(image_pil)

        font_size = 100
        font_path = "Assets/Nexa-Heavy.ttf"
        font = ImageFont.truetype(font_path, font_size)

        words = title.split()
        lines = []
        current_line = ""

        max_line_width = width - 200

        for word in words:
            test_line = current_line + (" " if current_line else "") + word
            test_bbox = draw.textbbox((0, 0), test_line, font=font)
            test_width = test_bbox[2] - test_bbox[0]

            if test_width < max_line_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word

        if current_line:
            lines.append(current_line)

        total_text_height = sum([draw.textbbox((0, 0), line, font=font)[3] - draw.textbbox((0, 0), line, font=font)[1] for line in lines])

        start_y = (height - total_text_height) // 2
        for line in lines:
            text_bbox = draw.textbbox((0, 0), line, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            position = ((width - text_width) // 2, start_y)

            draw.text(position, line, font=font, fill=(255, 255, 255))
            start_y += text_bbox[3] - text_bbox[1]

        bg = np.array(image_pil)

        img_byte_arr = BytesIO()
        image_pil.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)  

        return img_byte_arr

    except Exception as e:
        return None


def generate_thumbnail():
    try:
        data = request.get_json()
        title = data.get('title')
        if not title:
            return jsonify({"response": "Missing title parameter."})

        img_byte_arr = generate_thumbnails(title)

        if img_byte_arr:
         
            base64_img = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

            return jsonify({"image": base64_img}), 200
        else:
            return jsonify({"error": "Failed to generate image."}), 500

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred."}), 500