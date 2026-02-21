# AI Powered Interactive Sign Language Learning Assistant (Indian Sign Language - ISL)

A full-stack web application that helps users learn Indian Sign Language interactively using AI, speech recognition, and a 3D avatar that demonstrates signs in real time.

## Project Structure

```
Major Project/
├── backend/
│   ├── config/
│   │   └── database.js          
│   ├── controllers/
│   │   ├── authController.js    
│   │   ├── transcriptController.js
│   │   ├── userController.js
│   │   └── islController.js     
│   ├── middleware/
│   │   └── auth.js              
│   ├── models/
│   │   ├── User.js             
│   │   └── Transcript.js       
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transcripts.js
│   │   ├── user.js
│   │   └── isl.js
│   ├── services/
│   │   └── islConverter.js     
│   ├── server.js                
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Avatar/
│   │   │   │   ├── Avatar3D.jsx
│   │   │   │   ├── AvatarControls.jsx
│   │   │   │   └── AvatarCustomization.jsx
│   │   │   ├── Input/
│   │   │   │   ├── TextInput.jsx
│   │   │   │   └── VoiceInput.jsx
│   │   │   └── Transcript/
│   │   │       ├── TranscriptPanel.jsx
│   │   │       └── TranscriptHistory.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js          
│   │   ├── utils/
│   │   │   └── auth.js           
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```




