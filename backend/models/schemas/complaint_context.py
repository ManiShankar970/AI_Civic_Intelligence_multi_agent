from dataclasses import dataclass, field
from typing import Dict, Optional


@dataclass
class ComplaintContext:

    # Citizen Input

    image_path: str

    description: str

    latitude: float

    longitude: float

    address: str

    landmark: Optional[str] = ""

    # Issue Agent

    issue_type: Optional[str] = None

    confidence: Optional[float] = None

    # Severity Agent

    severity: Optional[str] = None

    # Routing Agent

    department: Optional[str] = None

    # Complaint Agent

    summary: Optional[str] = None

    complaint: Optional[str] = None

    recommended_action: Optional[str] = None

    expected_impact: Optional[str] = None

    # Status

    status: str = "Pending"

    metadata: Dict = field(default_factory=dict)