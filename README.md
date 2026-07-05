<img width="1917" height="1077" alt="complaint_track" src="https://github.com/user-attachments/assets/9d86f822-89de-45e6-b1cf-3bad36bd6c12" /><img width="1917" height="1077" alt="ai_civic_pic" src="https://github.com/user-attachments/assets/d5435f1b-2491-46a6-a15c-95bd6835ecec" /># 🚀 AI Civic Intelligence Multi-Agent System

> An AI-powered Smart City complaint management platform that automates the complete municipal complaint lifecycle using Machine Learning, FastAPI, Groq AI, and n8n workflow automation.

---

# 📖 Overview

AI Civic Intelligence Multi-Agent System is an end-to-end intelligent municipal complaint management platform designed to simplify how citizens report civic issues while automating the complete complaint lifecycle using Artificial Intelligence.

Instead of manually registering complaints and routing them to departments, the platform intelligently:

- 📷 Detects the issue from an uploaded image
- 📊 Predicts issue severity
- 🏢 Assigns the responsible municipal department
- 🤖 Generates a professional municipal complaint using AI
- 💾 Stores complaint records automatically
- 👨‍💼 Provides department-specific dashboards
- 📍 Enables real-time complaint tracking for citizens

The project integrates Machine Learning, FastAPI APIs, AI-powered complaint generation, workflow automation, and a modern React frontend into a single intelligent system.

---

# ✨ Key Features

## 👤 Citizen Portal

- Upload complaint images
- Enter complaint description
- Automatic GPS location detection
- Address & landmark support
- AI-powered complaint submission
- Complaint ID generation
- Complaint tracking portal

**Main Dashboard**
<img width="1917" height="1077" alt="ai_civic_pic" src="https://github.com/user-attachments/assets/4fa5ec76-8ff2-4874-8ed5-1675ab859bc4" />

**Complaint Report**
<img width="1917" height="1077" alt="complaint_track" src="https://github.com/user-attachments/assets/ccbf0203-53c8-4b90-ba23-aa569fbf80ef" />




---

## 🤖 AI Multi-Agent Pipeline

The complaint is automatically processed through multiple intelligent agents.

### 🧠 Issue Detection Agent

- TensorFlow CNN Model (.keras)
- Detects issue type from uploaded image

Examples:

- Garbage
- Pothole
- Water Leakage
- Streetlight Failure
- Road Damage
- Open Drainage

**Report Agent**
<img width="1917" height="1077" alt="ai_civic_reportissue" src="https://github.com/user-attachments/assets/0b7e8664-64a0-49d5-9cfb-e9070c80eea2" />


---

### 📊 Severity Prediction Agent

Random Forest Model (.pkl)

Predicts

- Low
- Medium
- High
- Critical

severity levels.

---

### 🏢 Department Routing Agent

Automatically maps detected issues to the responsible municipal department.

Examples

| Issue | Department |
|--------|------------|
| Garbage | Sanitation Department |
| Pothole | Road Maintenance Department |
| Water Leakage | Water Supply Department |
| Streetlight | Electrical Department |

**Department Dashboard**
<img width="1917" height="1077" alt="department_portel" src="https://github.com/user-attachments/assets/cdb1b90f-c52d-447f-b7b2-faf22197e861" />


---

### 📝 AI Complaint Generation Agent

Powered by

- Groq Compound Mini

Generates

- Professional Complaint
- Summary
- Recommended Actions
- Expected Impact

using prompt engineering.

---

### 💾 Database Agent

Stores complaint information in n8n Data Tables.

Automatically generates

- Complaint ID
- Timestamp
- Status

---

# 🏗 System Architecture

```

Citizen

│

▼

React Frontend

│

▼

FastAPI Backend

│

▼

n8n Workflow Automation

│

▼

Issue Detection Agent

│

▼

Severity Prediction Agent

│

▼

Department Routing Agent

│

▼

Groq Complaint Generation Agent

│

▼

Data Table

│

├───────────────┐

▼ ▼

Department Portal Track Portal

(Read & Update) (Read Only)

```

---

# 🔄 End-to-End Workflow

```

Citizen

↓

Uploads Image

↓

Writes Description

↓

Captures Current GPS Location

↓

Clicks Submit

↓

React Frontend

↓

FastAPI API

↓

n8n Workflow

↓

Issue Detection Model (.keras)

↓

Severity Prediction Model (.pkl)

↓

Department Mapping

↓

Groq Complaint Generator

↓

Complaint Stored

↓

Complaint ID Generated

↓

Submission Successful

↓

Department Dashboard

↓

Officer Updates Status

↓

Citizen Tracks Complaint

```

---

# 📁 Project Structure

```

AI_Civic_Intelligence_MultiAgent

├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── context/
│ │ ├── components/
│ │ └── types/
│
├── backend/
│ ├── app.py
│ ├── config.py
│ ├── orchestrator.py
│ ├── agents/
│ ├── models/
│ ├── knowledge/
│ └── uploads/
│
├── workflows/
│ └── n8n Workflows
│
└── README.md

```

---

# 📂 Important Frontend Files

| File | Responsibility |
|------|----------------|
| ReportIssue.tsx | Citizen complaint submission |
| complaintService.ts | Sends data to FastAPI |
| api.ts | Axios API configuration |
| AIProcessing.tsx | AI processing animation |
| SubmissionSuccess.tsx | Displays Complaint ID |
| DepartmentDashboard.tsx | Department complaint management |
| TrackComplaint.tsx | Citizen complaint tracking |
| PlatformContext.tsx | Global application state |

---

# ⚙ Backend Files

| File | Responsibility |
|------|----------------|
| app.py | FastAPI Server |
| orchestrator.py | AI Pipeline Controller |
| issue_agent.py | Image Classification |
| severity_agent.py | Severity Prediction |
| routing_agent.py | Department Mapping |
| complaint_agent.py | Groq Complaint Generation |

---

# 🔄 n8n Workflows

## Workflow A

Complaint Submission Pipeline

```

Webhook

↓

FastAPI

↓

Insert Complaint

↓

Respond

```

---

## Workflow B

Department Dashboard

```

Webhook

↓

Read Data Table

↓

Filter Department

↓

Return Complaints

```

---

## Workflow C

Status Update

```

Department Dashboard

↓

Webhook

↓

Update Complaint Status

↓

Data Table

```

---

## Workflow D

Complaint Tracking

```

Citizen

↓

Complaint ID

↓

Webhook

↓

Retrieve Complaint

↓

Display Status

```

<img width="1917" height="862" alt="ai_civic_n8n_pic" src="https://github.com/user-attachments/assets/e0fbbd38-b8ea-4af9-82b2-f3b7a4957fab" />


---

# 🛠 Technologies Used

## Frontend

- React
- TypeScript
- Tailwind CSS
- Axios
- Motion

## Backend

- FastAPI
- Python

## Artificial Intelligence

- TensorFlow
- Random Forest
- Groq Compound Mini
- Prompt Engineering

## Workflow Automation

- n8n

## Database

- n8n Data Tables

## Communication

- REST APIs
- Webhooks
- Multipart Form Data

## Location

- HTML5 Geolocation API

---

# 📊 AI Models

| Model | Purpose |
|--------|----------|
| TensorFlow (.keras) | Civic Issue Detection |
| Random Forest (.pkl) | Severity Prediction |
| Groq Compound Mini | Complaint Generation |

---

# 🌟 Project Highlights

✅ End-to-End AI Pipeline

✅ Machine Learning Integration

✅ Computer Vision

✅ Workflow Automation

✅ FastAPI REST APIs

✅ React Frontend

✅ Department Dashboard

✅ Citizen Tracking Portal

✅ GPS Location Detection

✅ AI-generated Professional Complaints

---

# 🚀 Future Enhancements

This project is actively under development.

Upcoming improvements include:

- 🔔 Real-time notifications
- 📧 Email & SMS alerts
- 🗺 GIS-based complaint visualization
- 📈 Analytics Dashboard
- 📱 Progressive Web App (PWA)
- ☁ Cloud Deployment
- 🤖 Advanced AI Agents
- 📊 Municipal performance analytics
- 🔐 Role-based authentication
- 🌍 Multi-language support

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

Feel free to:

- Fork the repository
- Create a feature branch
- Submit a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**G.Chandra Mani Shankar**

If you found this project interesting, consider ⭐ starring the repository and sharing your feedback!

---

## ⭐ If you like this project, don't forget to Star the repository!
