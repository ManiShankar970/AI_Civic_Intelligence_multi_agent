import uuid

from agents.issue_agent import predict_issue
from agents.severity_agent import predict_severity
from agents.routing_agent import get_department
from agents.complaint_agent import generate_complaint


def process_complaint(
    image_path,
    description,
    latitude,
    longitude,
    address,
    landmark
):

    # -------------------------------------
    # Agent 1 : Issue Detection
    # -------------------------------------

    issue_result = predict_issue(image_path)

    issue_type = issue_result["issue_type"]
    confidence = issue_result["confidence"]

    # -------------------------------------
    # Agent 2 : Severity
    # -------------------------------------

    severity_result = predict_severity(
        issue_type,
        description
    )

    severity = severity_result["severity"]

    # -------------------------------------
    # Agent 3 : Department Routing
    # -------------------------------------

    routing = get_department(issue_type)

    print("Routing Agent Output:")
    print(routing)

    department = routing["department"]

    # -------------------------------------
    # Agent 4 : Complaint Generation
    # -------------------------------------

    complaint = generate_complaint(

        issue_type=issue_type,

        severity=severity,

        department=department,

        description=description,

        latitude=latitude,

        longitude=longitude,

        address=address,

        landmark=landmark

    )

    # -------------------------------------
    # Final Response
    # -------------------------------------

    return {

        "complaint_id": str(uuid.uuid4())[:8],

        "issue_type": issue_type,

        "confidence": confidence,

        "severity": severity,

        "department": department,

        "latitude": latitude,

        "longitude": longitude,

        "address": address,

        "landmark": landmark,

        "summary": complaint["summary"],

        "complaint": complaint["complaint"],

        "recommended_action": complaint["recommended_action"],

        "expected_impact": complaint["expected_impact"],

        "status": "Generated"

    }