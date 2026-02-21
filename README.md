# AI Powered Interactive Sign Language Learning Assistant (Indian Sign Language - ISL)

A full-stack web application that helps users learn Indian Sign Language interactively using AI, speech recognition, and a 3D avatar that demonstrates signs in real time.

## Features

### 🔐 User Authentication
- User registration with email and password
- Secure login using JWT authentication
- Password hashing using bcrypt
- Protected dashboard routes

### 📝 Dashboard Features
- **Text Input**: Enter text manually for ISL conversion
- **Voice Input**: Real-time speech-to-text using Web Speech API
- **Live Transcript**: See and edit transcript in real-time
- **Transcript History**: View, manage, and delete learning history

### 🤖 AI Processing Pipeline
- Converts English text to ISL grammar format
- Example: "I am going to school today" → "TODAY SCHOOL I GO"
- Placeholder service ready for ML model integration

### 🎭 3D Avatar System
- Interactive 3D human avatar performing sign language gestures
- Real-time animation playback
- Controls: Play, Pause, Replay, Reset
- **Avatar Customization**:
  - Toggle between Male/Female avatar
  - Skin tone selector (5 options)
  - Settings saved to user profile

### 🔊 Voice Instruction System
- Simultaneous voice instructions during avatar gestures
- Describes hand movements and finger placements
- Uses Web Speech Synthesis API

### 📊 Transcript Management
- Store learning transcripts in database
- Delete single entries
- Clear all history

## Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Three.js** & **React Three Fiber** for 3D avatar
- **Axios** for API calls
- **Web Speech API** for speech recognition and synthesis

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcrypt** for password hashing

## Project Structure

```
Major Project/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── transcriptController.js
│   │   ├── userController.js
│   │   └── islController.js      # ISL conversion
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Transcript.js        # Transcript schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transcripts.js
│   │   ├── user.js
│   │   └── isl.js
│   ├── services/
│   │   └── islConverter.js     # ISL grammar conversion service
│   ├── server.js                # Express server
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
│   │   │   └── api.js           # API service layer
│   │   ├── utils/
│   │   │   └── auth.js           # Auth utilities
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

3. Create `.env` file (already created, but update if needed):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/isl_learning
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transcripts
- `GET /api/transcripts` - Get all user transcripts
- `POST /api/transcripts` - Create new transcript
- `DELETE /api/transcripts/:id` - Delete single transcript
- `DELETE /api/transcripts` - Delete all transcripts

### User
- `PUT /api/user/avatar-settings` - Update avatar settings

### ISL Conversion
- `POST /api/convert-to-isl/convert-to-isl` - Convert text to ISL grammar

## MongoDB Collections

### Users
```javascript
{
  email: String (unique, required),
  passwordHash: String (required),
  avatarGender: String (enum: ['male', 'female']),
  avatarFaceColor: String (hex color),
  createdAt: Date
}
```

### Transcripts
```javascript
{
  userId: ObjectId (ref: User),
  originalText: String (required),
  islConvertedText: String (required),
  timestamp: Date
}
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Input Text**: Type text manually or use voice input
3. **Convert to ISL**: Click "Convert to ISL" to see ISL grammar
4. **Watch Avatar**: 3D avatar demonstrates the sign language gestures
5. **Listen**: Voice instructions guide you through hand movements
6. **Customize Avatar**: Change gender and skin tone in the customization panel
7. **View History**: Check your learning history in the transcript panel

## Future Enhancements

The project structure is designed to support:

1. **ML Model Integration**: Replace mock ISL converter with real ML model
   - Update `backend/services/islConverter.js`
   - Add ML API endpoint integration

2. **Webcam Gesture Recognition**: Add gesture recognition feature
   - Integrate MediaPipe or TensorFlow.js
   - Add gesture comparison and feedback

3. **Enhanced 3D Avatar**: 
   - Load GLTF models for more realistic avatars
   - Add more detailed hand and finger animations
   - Support for complex sign language sequences

## Browser Compatibility

- **Speech Recognition**: Chrome, Edge (Chromium), Safari
- **Speech Synthesis**: All modern browsers
- **3D Rendering**: All modern browsers with WebGL support

## Security Notes

- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add HTTPS in production
- Validate and sanitize all user inputs

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## License

This project is created for educational purposes.

## Contributing

This is a major project. For enhancements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---

**Note**: The ISL conversion service is currently a placeholder/mock implementation. Replace it with a real ML model for production use.

