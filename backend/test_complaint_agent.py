from agents.complaint_agent import generate_complaint

result = generate_complaint(

    issue_type="garbage",

    severity="HIGH",

    department="Sanitation Department",

    description="Large garbage pile near school causing foul smell.",

    location="Ward 12"

)

print(result)