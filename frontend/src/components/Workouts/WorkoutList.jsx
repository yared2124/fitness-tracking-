import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { formatDate, calculateVolume } from "../../utils/helpers";
import { Edit, Trash2, Calendar, Activity, Plus } from "lucide-react";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      const res = await api.get("/workouts");
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    if (window.confirm("Delete this workout?")) {
      await api.delete(`/workouts/${id}`);
      fetchWorkouts();
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading workouts...</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">My Workouts</h1>
        <Link
          to="/workouts/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> New Workout
        </Link>
      </div>
      {workouts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-12 text-center">
          <p className="text-gray-500">
            No workouts yet. Start by logging one!
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-xl shadow-soft p-5 card-hover"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(w.date)}
                  </div>
                  <div className="space-y-2">
                    {w.exercises.map((e, idx) => (
                      <div
                        key={idx}
                        className="flex items-baseline gap-3 text-sm"
                      >
                        <span className="font-medium w-28">{e.name}</span>
                        <span className="text-gray-600">
                          {e.sets} × {e.reps}
                        </span>
                        <span className="text-gray-600">{e.weight} kg</span>
                      </div>
                    ))}
                  </div>
                  {w.notes && (
                    <p className="text-xs text-gray-400 mt-2">{w.notes}</p>
                  )}
                  <div className="flex items-center text-xs text-gray-400 mt-3">
                    <Activity className="w-3 h-3 mr-1" />
                    Total volume: {calculateVolume(w.exercises)} kg
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/workouts/edit/${w.id}`}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deleteWorkout(w.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
