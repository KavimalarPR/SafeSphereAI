🛡️ SafeSphere AI
Intelligent Women's Safety & Emergency Response Platform
Live Demo Frontend Backend AI

SafeSphere AI is a full-stack personal safety platform designed to provide fast access to emergency assistance, location-based safety services, emergency contacts, and AI-powered safety guidance.

🚀 Live Demo
Open SafeSphere AI

Note: The AI Assistant uses the Gemini API. Availability may be affected by the API's free-tier usage limits.

✨ Features
🚨 Emergency SOS
One-tap emergency assistance with the user's current location and access to emergency contacts.

👥 Emergency Contacts
Add, manage, call, and delete trusted emergency contacts.

📍 Live Location
Retrieve the user's current latitude and longitude using browser geolocation.

🚔 Nearby Police
Find nearby police stations using location-based map search.

🏥 Nearby Hospitals
Find nearby hospitals for emergency medical assistance.

🤖 SafeSphere AI
AI-powered safety guidance using Google Gemini through a secure backend API.

📋 SOS History
Maintain a history of emergency SOS events and their recorded locations.

👤 Profile Management
Manage personal information through the SafeSphere profile system.

🔐 Authentication
User registration, login, and protected dashboard access using Firebase Authentication.

🧠 AI Architecture
The AI Assistant follows a secure client-server architecture:

User
  │
  ▼
React Frontend
  │
  │ HTTPS API Request
  ▼
Node.js + Express Backend
  │
  │ Gemini API Request
  ▼
Google Gemini
  │
  ▼
AI Safety Response
  │
  ▼
React Frontend
The Gemini API key is kept on the backend and is not exposed in the React frontend.

🛠️ Tech Stack
Frontend
React
Vite
React Router
JavaScript
CSS
Backend
Node.js
Express.js
CORS
dotenv
Google GenAI SDK
AI
Google Gemini API
Authentication & Data
Firebase Authentication
Firebase Firestore
Browser Local Storage
Deployment
Vercel — Frontend
Render — Backend
GitHub — Source Control
📁 Project Structure
SafeSphere/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── EmergencyButton.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LiveLocation.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NearbyHospitals.jsx
│   │   │   ├── NearbyPolice.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SOSHistory.jsx
│   │   │
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Local Setup
1. Clone the repository
git clone https://github.com/KavimalarPR/SafeSphereAI.git
cd SafeSphere
2. Install frontend dependencies
cd frontend
npm install
3. Start the frontend
npm run dev
The frontend will normally run at:

http://localhost:5173
4. Install backend dependencies
Open another terminal:

cd backend
npm install
5. Configure the Gemini API key
Create a .env file inside the backend directory:

GEMINI_API_KEY=your_gemini_api_key
Never commit the .env file or expose the Gemini API key in frontend code.

6. Start the backend
npm start
The backend will normally run on:

http://localhost:5000
🔒 Security
SafeSphere follows a client-server architecture for AI requests.

Gemini API credentials are stored on the backend.
.env files are excluded from Git.
The frontend communicates with the backend through an API endpoint.
Protected routes restrict dashboard access to authenticated users.
Emergency guidance is presented as AI assistance and does not replace emergency responders.
📌 Important Safety Disclaimer
SafeSphere AI is a software project designed to demonstrate technology for personal safety and emergency assistance.

It should not be considered a replacement for emergency services, police, medical professionals, or other trained responders.

In an immediate emergency, contact the appropriate local emergency services.

🔮 Future Improvements
Real-time location sharing with trusted contacts
SMS and WhatsApp emergency notifications
Push notifications
Automatic SOS activation using advanced device signals
AI-powered risk detection
Voice-activated emergency assistance
Improved location-aware safety recommendations
Emergency response analytics
Production-grade database architecture
Mobile application support
🎯 Project Objective
The goal of SafeSphere AI is to combine modern web technologies, location services, cloud authentication, and generative AI to create a practical personal safety platform.

The project demonstrates full-stack development, API integration, authentication, geolocation, cloud services, and AI application development in a single system.

👩‍💻 Author
Kavimalar P R

Computer Science Engineering Student

GitHub: KavimalarPR

⭐ If you find this project interesting, consider giving the repository a star.