import joblib

# =====================================================
# Load Model Only Once
# =====================================================

model = joblib.load(
    "models/severity_classifier.pkl"
)

label_encoder = joblib.load(
    "models/severity_label_encoder.pkl"
)

# =====================================================
# Prediction Function
# =====================================================

def predict_severity(issue_type, description):

    combined_text = (
        issue_type
        + " [SEP] "
        + description
    )

    prediction = model.predict([combined_text])

    severity = label_encoder.inverse_transform(prediction)[0]

    return {

        "severity": severity

    }