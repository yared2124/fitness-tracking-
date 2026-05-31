import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import WorkoutItem from "./WorkoutItem";
import { Plus } from "lucide-react";

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
          {workouts.map((workout) => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              onDelete={deleteWorkout}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
