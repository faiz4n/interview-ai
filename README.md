# 🎯 InterviewAI - AI-Powered Interview Preparation Platform

An intelligent full-stack web application that provides AI-driven interview preparation, mock interviews, and personalized coaching based on your resume, skills, and target job description.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **AI-Powered Interview Report**: Generates comprehensive interview reports using Google Gemini AI
- **Technical & Behavioral Questions**: Curated questions with answers and interviewer intentions
- **Skill Gap Analysis**: Identifies missing skills relevant to the target job with severity levels
- **Personalized Preparation Plan**: Day-by-day interview preparation roadmap
- **Match Score**: Calculates how well your profile matches the job description (0-100)
- **Resume Upload**: Support for PDF resume uploads for AI analysis
- **Responsive Design**: Mobile-friendly interface with modern UI using SCSS
- **Protected Routes**: Secure access to interview features with authentication

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **AI Service**: Google Gemini AI 2.5 Flash
- **File Upload**: Multer
- **PDF Processing**: pdf-parse
- **Validation**: Zod
- **Dev Tools**: Nodemon

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: SCSS
- **HTTP Client**: Axios
- **Routing**: React Router 7
- **State Management**: React Context API
- **Package Manager**: npm

## 📁 Project Structure

```
interview-ai/
├── Backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   └── src/
│       ├── app.js                # Express app setup
│       ├── config/
│       │   └── database.js       # MongoDB connection
│       ├── controllers/          # Request handlers
│       │   ├── auth.controller.js
│       │   └── interviewController.js
│       ├── middlewares/          # Custom middleware
│       │   ├── auth.middleware.js
│       │   └── file.middleware.js
│       ├── models/               # MongoDB schemas
│       │   ├── user.model.js
│       │   ├── interviewReport.model.js
│       │   └── blacklist.model.js
│       ├── routes/               # API routes
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       └── services/             # Business logic
│           ├── ai.service.js     # AI integration
│           └── temp.js
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    └── src/
        ├── App.jsx               # Root component
        ├── app.routes.jsx        # Route definitions
        ├── main.jsx             # Entry point
        ├── features/
        │   ├── auth/            # Authentication feature
        │   │   ├── components/
        │   │   ├── hooks/       # useAuth, auth context
        │   │   ├── pages/       # Login, Register
        │   │   └── services/    # Auth API calls
        │   └── interview/        # Interview feature
        │       ├── pages/       # Interview sessions
        │       ├── services/
        │       └── styles/
        └── styles/              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API Key

### Get Google Gemini API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Click **"Create API Key"** button
3. Select or create a Google Cloud project
4. Copy the generated API key
5. Add to Backend `.env` file as `GOOGLE_GENAI_API_KEY`

> **Note**: Free tier provides 60 requests/minute and 1,500 requests/day. Uses Gemini 2.5 Flash model (fastest & cheapest).

### Environment Setup

#### Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_google_api_key_here
VITE_FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

### Installation & Running

#### Backend

```bash
cd Backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

#### Frontend

```bash
cd Frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout and blacklist token
- `GET /api/auth/get-me` - Get current user details (Protected)

### Interview

- `POST /api/interview` - Generate interview report (Protected)
  - Form data: `resume` (PDF file), `selfDescription`, `jobDescription`

## 🔒 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using bcrypt before storing
3. On login, JWT token is generated and stored in secure HTTP-only cookies
4. Protected routes verify token validity using middleware
5. Logout blacklists the token to prevent reuse

## 🤖 AI Service Integration

The platform uses **Google Gemini AI 2.5 Flash** to:

- Analyze resume and job descriptions
- Generate technical interview questions
- Suggest behavioral questions
- Identify skill gaps
- Create personalized preparation plans
- Calculate match scores

### Response Format

```json
{
  "matchScore": 85,
  "technicalQuestions": [...],
  "behavioralQuestions": [...],
  "skillGaps": [...],
  "preparationPlan": [...]
}
```

## 🎨 Frontend Components

### Auth Feature

- **Protected.jsx** - Route guard component for authenticated users
- **Login.jsx** - User login form
- **Register.jsx** - User registration form
- **useAuth.js** - Custom hook for authentication logic
- **auth.context.jsx** - Context provider for auth state

### Interview Feature

- **Home.jsx** - Landing page for interview setup
- **Interview.jsx** - Interview session and report display

## 📊 Database Schema

### Users

- username (unique, required)
- email (unique, required)
- password (hashed, required)

### Interview Reports

- jobDescription
- resume
- selfDescription
- matchScore (0-100)
- technicalQuestions (array)
- behavioralQuestions (array)
- skillGaps (array)
- preparationPlan (array)
- user (reference to User)
- timestamps

### Blacklisted Tokens

- token (blacklisted JWT)
- timestamps

## 🔑 Key Dependencies

**Backend:**

- `@google/genai` - Google Gemini API client
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `multer` - File upload handling
- `pdf-parse` - PDF parsing
- `zod` - Schema validation

**Frontend:**

- `react` - UI library
- `vite` - Build tool
- `react-router` - Client-side routing
- `axios` - HTTP client
- `sass` - CSS preprocessing

## 🔄 Development Workflow

1. **Backend Development**

   ```bash
   cd Backend
   npm run dev
   ```

   Nodemon automatically restarts on file changes

2. **Frontend Development**

   ```bash
   cd Frontend
   npm run dev
   ```

   Vite provides HMR for instant updates

3. **Linting**

   ```bash
   cd Frontend
   npm run lint
   ```

4. **Production Build**
   ```bash
   cd Frontend
   npm run build
   ```

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Render/Railway/Heroku)

- Set environment variables
- Deploy from GitHub repository
- Run `npm install` during build
- Start command: `node server.js`

## 📝 Learning Outcomes

This project demonstrates:

- Full-stack MERN development
- RESTful API design
- User authentication and authorization
- External API integration (Google Gemini)
- PDF file processing
- React hooks and Context API
- Express middleware patterns
- MongoDB data modeling
- Responsive web design
- Security best practices (JWT, bcrypt, HTTPS)

## 👨‍💻 Author

**Faizan** - Full Stack Developer

---

**Happy Interviewing! 🎯**
