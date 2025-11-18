# Rating Website - Backend API

🚀 **Backend API for Rating Website** - A Node.js/Express server with MongoDB for managing participants and voting.

## 🌟 Live Demo

**API Endpoint**: Coming soon after Render deployment

## 📋 Features

- ✅ JWT-based authentication
- ✅ User signup/login
- ✅ Participant management (CRUD)
- ✅ Voting system with vote tracking
- ✅ MongoDB Atlas integration
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Production-ready configuration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **File Upload**: Multer
- **Environment**: dotenv

## 📦 Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Git

### Local Setup

```bash
# Clone repository
git clone https://github.com/justfsl50/rating.git
cd rating

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# MONGO_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=3000

# Start development server
npm run dev

# Or start production server
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

## 📡 API Endpoints

### Health & Info
- `GET /` - API information
- `GET /health` - Health check endpoint

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - Login user

### Participants
- `GET /allParticipants` - Get all participants
- `GET /allParticipantsByVotes` - Get participants sorted by votes (leaderboard)
- `POST /addParticipants` - Add new participant (with image upload)
- `DELETE /deleteParticipant/:id` - Delete participant by ID
- `POST /voteParticipant/:id` - Vote for a participant

## 🚀 Deploy to Render

### Quick Deploy Steps:

1. **Push to GitHub** (Already done! ✅)

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect this GitHub repository
   - Configure:
     - **Name**: `rating-website-backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Add Environment Variables**:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=your_frontend_url
   ```

5. **Deploy** and copy your backend URL!

### Render Configuration

This project includes `render.yaml` with deployment hints.

**Free Tier**: Render offers 750 hours/month free hosting!

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ CORS whitelist configuration
- ✅ Environment variables for sensitive data
- ✅ `.env` files excluded from Git

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Participants Collection
```javascript
{
  name: String,
  department: String,
  email: String,
  description: String,
  image: String (base64),
  teamNo: Number,
  votes: Number (default: 0)
}
```

## 🧪 Testing

Test the deployed API:

```bash
# Health check
curl https://your-app.onrender.com/health

# Get all participants
curl https://your-app.onrender.com/allParticipants

# Get leaderboard
curl https://your-app.onrender.com/allParticipantsByVotes
```

## 📝 Scripts

```json
{
  "start": "node index.js",      // Production server
  "dev": "nodemon index.js",     // Development with auto-reload
  "test": "jest --runInBand"     // Run tests
}
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has read/write permissions

### CORS Errors
- Add frontend URL to `FRONTEND_URL` environment variable
- Redeploy after updating environment variables

### Render Deployment Issues
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB Atlas is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

MIT License

## 👤 Author

**justfsl50**
- GitHub: [@justfsl50](https://github.com/justfsl50)

## 🔗 Related

- **Frontend Repository**: Coming soon
- **Full Project Documentation**: See deployment guides

## 📞 Support

For deployment help or issues:
- Open an issue on GitHub
- Check Render documentation: https://render.com/docs
- MongoDB Atlas docs: https://docs.atlas.mongodb.com

---

**⭐ Star this repo if you find it helpful!**

**🚀 Ready to deploy!** Follow the steps above to get your API live on Render.
