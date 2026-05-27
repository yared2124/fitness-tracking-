import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/Layout/PrivateRoute";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkoutList from "./components/Workouts/WorkoutList";
import WorkoutForm from "./components/Workouts/WorkoutForm";
import ProgressPage from "./components/Progress/ProgressPage";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/workouts"
                element={
                  <PrivateRoute>
                    <WorkoutList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/workouts/new"
                element={
                  <PrivateRoute>
                    <WorkoutForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/workouts/edit/:id"
                element={
                  <PrivateRoute>
                    <WorkoutForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/progress"
                element={
                  <PrivateRoute>
                    <ProgressPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
