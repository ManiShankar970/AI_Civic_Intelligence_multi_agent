import json
import numpy as np
import tensorflow as tf

from tensorflow.keras.preprocessing import image

# ===========================================
# Load Model
# ===========================================

model = tf.keras.models.load_model(
    "models/issue_detection_model.keras"
)

print("✅ Model Loaded")

# ===========================================
# Load Labels
# ===========================================

with open("models/label_map.json") as f:
    label_map = json.load(f)

print("✅ Labels Loaded")

print(label_map)

# ===========================================
# Load Image
# ===========================================

img_path = "uploads/sample.jpg"

img = image.load_img(
    img_path,
    target_size=(224,224)
)

img_array = image.img_to_array(img)

from tensorflow.keras.applications.efficientnet import preprocess_input

img_array = np.expand_dims(img_array, axis=0)
img_array = preprocess_input(img_array)

# ===========================================
# Prediction
# ===========================================

prediction = model.predict(img_array)

predicted_index = np.argmax(prediction)

confidence = float(np.max(prediction))

issue_type = label_map[str(predicted_index)]

# ===========================================
# Output
# ===========================================

print("\n==============================")

print("Issue Type :", issue_type)

print("Confidence :", round(confidence,4))

print("==============================")