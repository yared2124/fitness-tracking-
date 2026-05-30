# Fitness Tracking Backend

Modern React + Tailwind CSS frontend for the Fitness Tracking API.  
Features: authentication, workout logging, progress charts, and profile settings.

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   REACT_APP_API_URL=http://localhost:5000/api
   npm start
   npm run build

   Backend Requirements
Node.js backend running at the API URL above.

Endpoints needed:

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

GET /api/workouts

POST /api/workouts

PUT /api/workouts/:id

DELETE /api/workouts/:id

GET /api/progress/volume-over-time

GET /api/progress/exercise-progress

PUT /api/users/preferences

Tech Stack
React 18

React Router v6

Tailwind CSS 3

Chart.js + react-chartjs-2

Axios

Lucide React icons

Framer Motion (optional, for animations)

text

---

## 🚀 Running the Full Stack

1. **Backend** (in `backend-fitness-tracking` folder):
   ```bash
   npm run dev
Ensure MySQL is running and the database is created.

Frontend (in fitness-frontend folder):

bash
npm install
npm start
Open http://localhost:3000 and enjoy your modern fitness tracker!
