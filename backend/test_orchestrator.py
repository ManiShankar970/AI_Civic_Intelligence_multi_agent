from orchestrator import process_complaint

result = process_complaint(

    image_path="uploads/sample.jpg",

    description="Large pothole causing vehicle damage.",

    latitude=17.385,

    longitude=78.486

)

print(result)