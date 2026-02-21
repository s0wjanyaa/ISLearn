# Setup Instructions

## Quick Start Guide

### 1. Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- MongoDB (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- npm or yarn package manager

### 2. MongoDB Setup

#### Windows:
1. Download and install MongoDB from the official website
2. Start MongoDB service:
   ```bash
   # Using Windows Service
   net start MongoDB
   
   # Or manually
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath="C:\data\db"
   ```

#### Mac:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

### 3. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/isl_learning
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
1. Ensure MongoDB is running:
   ```bash
   # Check MongoDB status
   # Windows: Check Services
   # Mac/Linux: sudo systemctl status mongod
   ```

2. Verify MongoDB URI in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/isl_learning
   ```

3. If using a different port, update the URI accordingly

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
1. Change the port in `backend/.env`:
   ```
   PORT=5001
   ```

2. Update `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

### Frontend Can't Connect to Backend

**Error**: `Network Error` or `CORS Error`

**Solution**:
1. Ensure backend is running on the correct port
2. Check `VITE_API_URL` in `frontend/.env` matches backend port
3. Verify CORS is enabled in `backend/server.js` (it should be)

### Speech Recognition Not Working

**Issue**: Voice input button is disabled or shows error

**Solution**:
1. Use Chrome or Edge browser (best support)
2. Ensure microphone permissions are granted
3. Use HTTPS in production (required for some browsers)

### 3D Avatar Not Rendering

**Issue**: Black screen or no avatar visible

**Solution**:
1. Check browser console for WebGL errors
2. Ensure graphics drivers are updated
3. Try a different browser

## Development Commands

### Backend
```bash
cd backend
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start production server
```

### Frontend
```bash
cd frontend
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run preview # Preview production build
```

## Database Management

### View Data in MongoDB
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use isl_learning

# View collections
show collections

# View users
db.users.find().pretty()

# View transcripts
db.transcripts.find().pretty()
```

### Reset Database
```bash
# In MongoDB shell
use isl_learning
db.dropDatabase()
```

## Production Deployment

### Environment Variables
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Use MongoDB Atlas or production MongoDB instance
- Update `VITE_API_URL` to production backend URL

### Build Frontend
```bash
cd frontend
npm run build
# Deploy the `dist` folder to your hosting service
```

### Deploy Backend
- Use PM2 or similar process manager
- Set up reverse proxy (nginx)
- Enable HTTPS
- Set up environment variables on hosting platform

## Next Steps

1. **Replace ISL Converter**: Update `backend/services/islConverter.js` with real ML model
2. **Add More Gestures**: Enhance 3D avatar with more sign language gestures
3. **Webcam Integration**: Add gesture recognition using MediaPipe or TensorFlow.js
4. **User Progress**: Add learning progress tracking
5. **Quizzes**: Add interactive quizzes to test learning

## Support

For issues:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Check browser compatibility

---

Happy Learning! 🎉

