import json

# ==========================================
# Load Mapping
# ==========================================

with open("knowledge/department_mapping.json", "r") as f:
    department_mapping = json.load(f)


# ==========================================
# Routing Agent
# ==========================================

def get_department(issue_type):

    issue = issue_type.lower().strip()

    if issue not in department_mapping:

        return {
            "department": "Unknown Department",
            "department_id": "UNKNOWN",
            "email": "",
            "queue": "",
            "status": "Manual Review",
            "sla_hours": 0,
            "escalation_after": 0
        }

    dept = department_mapping[issue]

    return {

        "department": dept["department_name"],

        "department_id": dept["department_id"],

        "email": dept["email"],

        "queue": dept["queue"],

        "status": dept["default_status"],

        "sla_hours": dept["sla_hours"],

        "escalation_after": dept["escalation_after"]

    }