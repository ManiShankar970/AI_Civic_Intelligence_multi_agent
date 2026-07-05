import os
import uuid
import traceback

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse

from orchestrator import process_complaint

app = FastAPI(
    title="AI Civic Intelligence Agent",
    version="1.0"
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "status": "Running",
        "message": "AI Civic Intelligence Agent"
    }


@app.post("/generate-complaint")
async def generate_complaint_api(
    image: UploadFile = File(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    address: str = Form(...),
    landmark: str = Form("")
):
    filepath = None

    try:
        # Save uploaded image
        extension = os.path.splitext(image.filename)[1]
        if extension == "":
            extension = ".jpg"

        filename = f"{uuid.uuid4()}{extension}"

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        with open(filepath, "wb") as f:
            f.write(await image.read())

        # Call AI pipeline
        result = process_complaint(
            image_path=filepath,
            description=description,
            latitude=latitude,
            longitude=longitude,
            address=address,
            landmark=landmark
        )

        return result

    except Exception as e:

        # Print complete traceback in terminal
        traceback.print_exc()

        # Return actual error for debugging
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error_type": type(e).__name__,
                "error_message": str(e)
            }
        )

    finally:
        if filepath and os.path.exists(filepath):
            os.remove(filepath)