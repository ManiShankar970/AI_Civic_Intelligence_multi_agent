import json
import numpy as np
import tensorflow as tf

from PIL import Image

from tensorflow.keras.applications.efficientnet import preprocess_input

# =====================================================
# Load Model Only Once
# =====================================================

model = tf.keras.models.load_model(
    "models/issue_detection_model.keras"
)

with open("models/label_map.json") as f:
    label_map = json.load(f)

# =====================================================
# Prediction Function
# =====================================================

def predict_issue(image_path):

    img = Image.open(image_path)

    img = img.convert("RGB")

    img = img.resize((224,224))

    img = np.array(img)

    img = np.expand_dims(img, axis=0)

    img = preprocess_input(img)

    prediction = model.predict(img, verbose=0)[0]

    predicted_index = np.argmax(prediction)

    confidence = float(prediction[predicted_index])

    issue_type = label_map[str(predicted_index)]

    scores = {}

    for i in range(len(prediction)):

        scores[label_map[str(i)]] = round(float(prediction[i]),4)

    return {

        "issue_type": issue_type,

        "confidence": round(confidence,4),

        "scores": scores

    }