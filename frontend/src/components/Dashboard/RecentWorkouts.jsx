import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { formatDate, calculateVolume } from "../../utils/helpers";
import { ArrowRight, Calendar, Activity } from "lucide-react";

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.get("/workouts");
        setWorkouts(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkouts();
  }, []);

  if (workouts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-semibold mb-2">Recent Workouts</h2>
        <p className="text-gray-500">No workouts yet.</p>
        <Link to="/workouts/new" className="mt-4 inline-block text-indigo-600">
          Log your first →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
      <div className="space-y-4">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="border-b border-gray-100 pb-3 last:border-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(w.date)}
                </div>
                <p className="font-medium">
                  {w.exercises
                    .slice(0, 2)
                    .map((e) => e.name)
                    .join(", ")}
                  {w.exercises.length > 2 && ` +${w.exercises.length - 2} more`}
                </p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <Activity className="w-3 h-3 mr-1" />
                  Volume: {calculateVolume(w.exercises)} kg
                </div>
              </div>
              <Link
                to={`/workouts/edit/${w.id}`}
                className="text-indigo-500 text-sm"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/workouts"
        className="mt-4 flex items-center text-indigo-600 text-sm"
      >
        View all <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
};

export default RecentWorkouts;
